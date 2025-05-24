import { NextResponse } from 'next/server'
import { z } from 'zod'

// Contact form schema validation
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the request body against our schema
    const validatedData = contactFormSchema.parse(body)

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM/ticketing system
    // For now, we'll just log the data
    console.log('Contact form submission:', validatedData)

    // Return success response
    return NextResponse.json(
      { message: 'Thank you for your message. We will get back to you soon.' },
      { status: 200 }
    )
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))
      return NextResponse.json({ errors }, { status: 400 })
    }

    // Handle other errors
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
} 