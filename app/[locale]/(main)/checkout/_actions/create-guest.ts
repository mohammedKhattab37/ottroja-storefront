'use server'

import { ZodError } from 'zod'
import { CustomerUser, RegisterErrorResponse } from '../../_auth/_actions/types'

interface GuestDataInput {
  email: string
  phoneNumber: string
  name: string
}

export async function CreateGuest(
  validatedData: GuestDataInput,
): Promise<{ success: true; customer: CustomerUser } | RegisterErrorResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const response = await fetch(`${baseUrl}/customers/guest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Guest creation failed',
        issues: result.issues,
      }
    }

    return {
      success: true,
      customer: result.customer,
    }
  } catch (error) {
    console.error('Guest Creation error:', error)

    // Handle validation errors
    if (error instanceof ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        issues: error.issues,
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
