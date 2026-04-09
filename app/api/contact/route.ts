import { NextRequest } from 'next/server'

interface ContactFormData {
  name: string
  phone: string
  email: string
  serviceType: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Server-side validation (T-01-04-01, T-01-04-02: never trust client-side validation alone)
    if (!body.name?.trim() || !body.phone?.trim() || !body.email?.trim()) {
      return Response.json(
        { error: 'Name, phone, and email are required.' },
        { status: 400 }
      )
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return Response.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Forward to GoHighLevel webhook (T-01-04-03: server-only, never exposed to client)
    const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL
    if (!ghlWebhookUrl) {
      console.error('GHL_WEBHOOK_URL not configured')
      return Response.json(
        { error: 'Form submission failed. Please call us directly at (973) 555-0100.' },
        { status: 500 }
      )
    }

    const ghlResponse = await fetch(ghlWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: body.name.split(' ')[0],
        lastName: body.name.split(' ').slice(1).join(' ') || '',
        phone: body.phone,
        email: body.email,
        source: 'Website Contact Form',
        tags: ['website-lead', body.serviceType].filter(Boolean),
        customField: {
          service_requested: body.serviceType,
          message: body.message,
        },
      }),
    })

    if (!ghlResponse.ok) {
      console.error('GHL webhook failed:', ghlResponse.status, await ghlResponse.text())
      return Response.json(
        { error: 'Form submission failed. Please call us directly at (973) 555-0100.' },
        { status: 500 }
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { error: 'Something went wrong. Please call us directly at (973) 555-0100.' },
      { status: 500 }
    )
  }
}
