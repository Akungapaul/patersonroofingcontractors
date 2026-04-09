import { NextRequest } from 'next/server'

// Allowlisted GoHighLevel webhook hosts to prevent SSRF (CR-01)
const ALLOWED_GHL_HOSTS = [
  'services.leadconnectorhq.com',
  'app.gohighlevel.com',
]

// Valid service types for server-side validation (HI-02)
const VALID_SERVICE_TYPES = [
  'Roof Repair',
  'Roof Replacement',
  'Roof Inspection',
  'Storm Damage Repair',
  'Flat Roof Services',
  'Gutter Installation',
  'Emergency Roofing',
  'Commercial Roofing',
  'Other',
  '',
] as const

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

    // Validate serviceType against known options (HI-02)
    if (
      body.serviceType &&
      !VALID_SERVICE_TYPES.includes(
        body.serviceType as (typeof VALID_SERVICE_TYPES)[number]
      )
    ) {
      return Response.json(
        { error: 'Invalid service type selected.' },
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

    // Validate webhook URL against allowlisted hosts to prevent SSRF (CR-01)
    let parsedUrl: URL
    try {
      parsedUrl = new URL(ghlWebhookUrl)
    } catch {
      console.error('GHL_WEBHOOK_URL is not a valid URL')
      return Response.json(
        { error: 'Form submission failed. Please call us directly at (973) 555-0100.' },
        { status: 500 }
      )
    }

    if (!ALLOWED_GHL_HOSTS.includes(parsedUrl.hostname)) {
      console.error(
        'GHL_WEBHOOK_URL points to a disallowed host:',
        parsedUrl.hostname
      )
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
