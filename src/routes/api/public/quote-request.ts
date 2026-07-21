import * as React from 'react'
import { render } from '@react-email/components'
import { createFileRoute } from '@tanstack/react-router'
import { Resend } from 'resend'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const TEMPLATE_NAME = 'quote-request'
const FROM = 'Twist & Glow <noreply@twistandglowlv.com>'

const Schema = z.object({
  name: z.string().max(200).optional().default(''),
  email: z.string().max(200).optional().default(''),
  phone: z.string().max(80).optional().default(''),
  contact: z.string().max(200).optional().default(''),
  eventDate: z.string().max(80).optional().default(''),
  startTime: z.string().max(40).optional().default(''),
  duration: z.string().max(40).optional().default(''),
  location: z.string().max(300).optional().default(''),
  eventType: z.string().max(120).optional().default(''),
  guests: z.string().max(40).optional().default(''),
  details: z.string().max(5000).optional().default(''),
  services: z.string().max(500).optional().default(''),
  source: z.string().max(80).optional().default(''),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export const Route = createFileRoute('/api/public/quote-request')({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        let raw: unknown
        try {
          raw = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400, headers: corsHeaders })
        }

        const parsed = Schema.safeParse(raw)
        if (!parsed.success) {
          return Response.json({ error: 'Invalid input' }, { status: 400, headers: corsHeaders })
        }
        const data = parsed.data

        const entry = TEMPLATES[TEMPLATE_NAME]
        if (!entry || !entry.to) {
          return Response.json({ error: 'Template not configured' }, { status: 500, headers: corsHeaders })
        }

        const apiKey = process.env.RESEND_API_KEY
        if (!apiKey) {
          return Response.json({ error: 'Email not configured' }, { status: 500, headers: corsHeaders })
        }

        const submittedAt = new Date().toISOString()
        const templateData = { ...data, submittedAt }

        const html = await render(React.createElement(entry.component, templateData))
        const text = await render(React.createElement(entry.component, templateData), { plainText: true })
        const subject =
          typeof entry.subject === 'function' ? entry.subject(templateData) : entry.subject

        const resend = new Resend(apiKey)
        const { error } = await resend.emails.send({
          from: FROM,
          to: entry.to,
          replyTo: data.email || undefined,
          subject,
          html,
          text,
        })

        if (error) {
          console.error('Resend send failed', error)
          return Response.json({ error: 'Failed to send' }, { status: 500, headers: corsHeaders })
        }

        return Response.json({ success: true }, { headers: corsHeaders })
      },
    },
  },
})
