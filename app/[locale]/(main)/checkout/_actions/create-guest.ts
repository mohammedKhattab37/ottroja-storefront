'use server'

import { apiFetch } from '@/lib/utils'
import { ZodError } from 'zod'
import { CustomerUser, RegisterErrorResponse } from '../../_auth/_actions/types'

interface GuestDataInput {
  email?: string
  phoneNumber: string
  name: string
}

export async function CreateGuest(
  validatedData: GuestDataInput,
): Promise<{ success: true; customer: CustomerUser } | RegisterErrorResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    // Filter out empty email if it exists
    const requestData: Partial<GuestDataInput> = {
      name: validatedData.name,
      phoneNumber: validatedData.phoneNumber,
    }
    
    // Only include email if it's not empty
    if (validatedData.email && validatedData.email.trim() !== '') {
      requestData.email = validatedData.email
    }

    const response = await apiFetch(
      `${baseUrl}/customers/guest`,
      undefined,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      }
    )

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response received:', text.substring(0, 200))
      return {
        success: false,
        error: 'Invalid response from server. Please try again.',
      }
    }

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
