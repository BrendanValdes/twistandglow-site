import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  phone?: string
  contact?: string
  eventDate?: string
  startTime?: string
  duration?: string
  location?: string
  eventType?: string
  guests?: string
  details?: string
  services?: string
  source?: string
  submittedAt?: string
}

const dash = (v?: string) => (v && String(v).trim().length > 0 ? String(v) : '—')

const Email = (props: Props) => {
  const rows: Array<[string, string]> = [
    ['Name', dash(props.name)],
    ['Email', dash(props.email)],
    ['Phone', dash(props.phone)],
    ['Contact (combined)', dash(props.contact)],
    ['Event Date', dash(props.eventDate)],
    ['Event Start Time', dash(props.startTime)],
    ['Event Duration', dash(props.duration)],
    ['Event Location', dash(props.location)],
    ['Event Type', dash(props.eventType)],
    ['Estimated Guests', dash(props.guests)],
    ['Services of Interest', dash(props.services)],
    ['Source Form', dash(props.source)],
    ['Submitted At', dash(props.submittedAt)],
  ]
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New quote request from {dash(props.name)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Quote Request</Heading>
          <Text style={sub}>Twist &amp; Glow Las Vegas</Text>
          <Hr style={hr} />
          <Section>
            {rows.map(([label, value]) => (
              <div key={label} style={row}>
                <Text style={labelStyle}>{label}</Text>
                <Text style={valueStyle}>{value}</Text>
              </div>
            ))}
          </Section>
          <Hr style={hr} />
          <Text style={labelStyle}>Event Description</Text>
          <Text style={description}>{dash(props.details)}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: 'New Quote Request - Twist & Glow',
  displayName: 'New Quote Request',
  to: 'twist.and.glow.facepainting@gmail.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '555-123-4567',
    eventDate: '2026-08-15',
    startTime: '18:00',
    duration: '3',
    location: 'Bellagio, Las Vegas',
    eventType: 'Corporate or Brand Activation',
    guests: '120',
    services: 'Face Painting, UV Glow',
    details: 'Brand activation on the casino floor.',
    source: 'Hero Quote Form',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, Helvetica, sans-serif',
  margin: 0,
  padding: '24px 0',
}
const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '32px 28px',
  border: '1px solid #eaeaea',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
}
const h1: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 800,
  margin: '0 0 4px 0',
  color: '#0d0d0f',
}
const sub: React.CSSProperties = {
  fontSize: '13px',
  color: '#6b6b72',
  margin: '0',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}
const hr: React.CSSProperties = { borderColor: '#eaeaea', margin: '20px 0' }
const row: React.CSSProperties = { marginBottom: '10px' }
const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#8a8a93',
  margin: '0 0 2px 0',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
}
const valueStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#0d0d0f',
  margin: '0',
  fontWeight: 600,
}
const description: React.CSSProperties = {
  fontSize: '14px',
  color: '#1f1f24',
  margin: '6px 0 0 0',
  whiteSpace: 'pre-wrap',
  lineHeight: 1.5,
}