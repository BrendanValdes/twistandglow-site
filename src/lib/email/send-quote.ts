export type QuoteRequestPayload = {
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
}

export async function sendQuoteRequest(payload: QuoteRequestPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/public/quote-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch (err) {
    console.error('Failed to send quote request', err)
    return false
  }
}