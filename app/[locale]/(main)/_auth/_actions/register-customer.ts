'use server'

import { apiFetch } from '@/lib/utils'
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

    // Get the base URL for the API call
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    // Make the API call to register the customer
    const response = await apiFetch(
      `${baseUrl}/customers/auth/register`,
      undefined,
      {
        method: 'POST',
        body: JSON.stringify(registrationData),
      }
    )

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

    if (!response.ok) {
      // Map specific server errors to translation keys
      let errorKey = 'auth.errors.server.unexpected'

      if (response.status === 400) {
        if (
          result.error?.toLowerCase().includes('already exists') ||
          result.error?.toLowerCase().includes('user exists')
        ) {
          errorKey = 'auth.errors.server.email_exists'
        } else {
          errorKey = 'auth.errors.server.validation'
        }
      } else if (response.status === 500) {
        errorKey = 'auth.errors.server.connection'
      }

      return {
        success: false,
        error: errorKey,
        originalError: result.error, // Keep original for debugging
        issues: result.issues,
      }
    }

    // If registration is successful and we have a token, set it as a cookie
    if (result.token) {
      const cookieStore = await cookies()
      // Set the JWT token as an HttpOnly cookie for security (same cookie name as login)
      cookieStore.set('better-auth.session_token', result.token, {
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
        error: 'auth.errors.server.validation',
        issues: error.issues,
      }
    }

    // Handle fetch errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'auth.errors.server.connection',
      }
    }

    return {
      success: false,
      error: 'auth.errors.server.unexpected',
    }
  }
}
