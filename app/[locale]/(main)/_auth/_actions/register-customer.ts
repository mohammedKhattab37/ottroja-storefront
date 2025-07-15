'use server'

import { CustomerRegisterSchema, type CustomerRegisterInput } from '@/zod/auth-shcema'
import { cookies } from 'next/headers'
import { ZodError } from 'zod'
import type { RegisterResponse } from './types'

export async function registerCustomer(data: CustomerRegisterInput): Promise<RegisterResponse> {
  try {
    // Validate the input data
    const validatedData = CustomerRegisterSchema.parse(data)

    // Prepare the data for API call - only required fields
    const registrationData = {
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    }

    // Log the data being sent for debugging
    console.log('Sending registration data:', {
      registrationData,
    })

    // Get the base URL for the API call
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    // Make the API call to register the customer
    const response = await fetch(`${baseUrl}/api/customers/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })

    let result
    try {
      result = await response.json()
    } catch (parseError) {
      console.error('Failed to parse API response as JSON:', parseError)
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.statusText}`,
      }
    }

    // Log the response for debugging
    console.log('Registration API response:', {
      status: response.status,
      statusText: response.statusText,
      success: result.success,
      error: result.error,
      hasCustomer: !!result.customer,
      fullResponse: result,
    })

    if (!response.ok) {
      // For 500 errors, provide more specific error message
      if (response.status === 500) {
        return {
          success: false,
          error: `Server error: ${result.error || 'Internal server error occurred'}. Please check server logs for more details.`,
          issues: result.issues,
        }
      }

      return {
        success: false,
        error: result.error || `Request failed with status ${response.status}`,
        issues: result.issues,
      }
    }

    // If registration is successful and we have a token, set it as a cookie
    if (result.token) {
      const cookieStore = await cookies()
      // Set the JWT token as an HttpOnly cookie for security
      cookieStore.set('auth-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days (matching token expiration)
        path: '/',
      })
    }

    return {
      success: true,
      message: result.message,
      token: result.token,
      customer: result.customer,
    }
  } catch (error) {
    console.error('Registration error:', error)

    // Handle validation errors
    if (error instanceof ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        issues: error.issues,
      }
    }

    // Handle fetch errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error:
          'Failed to connect to authentication service. Please check if the server is running.',
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred during registration',
    }
  }
}
