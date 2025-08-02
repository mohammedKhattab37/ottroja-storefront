'use server'

import { CustomerLoginSchema, type CustomerLoginInput } from '@/zod/auth-shcema'
import { cookies } from 'next/headers'
import { ZodError } from 'zod'
import type { LoginResponse } from './types'

export async function loginCustomer(data: CustomerLoginInput): Promise<LoginResponse> {
  try {
    // Validate the input data
    const validatedData = CustomerLoginSchema.parse(data)

    // Get the base URL for the API call
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    // Make the API call to login the customer
    const response = await fetch(`${baseUrl}/customers/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })

    const result = await response.json()

    if (!response.ok) {
      // Map specific server errors to translation keys
      let errorKey = 'auth.errors.server.unexpected'

      if (response.status === 401) {
        errorKey = 'auth.errors.server.invalid_credentials'
      } else if (response.status === 404) {
        errorKey = 'auth.errors.server.account_not_found'
      } else if (response.status === 403) {
        errorKey = 'auth.errors.server.account_disabled'
      } else if (response.status === 429) {
        errorKey = 'auth.errors.server.too_many_attempts'
      } else if (response.status >= 500) {
        errorKey = 'auth.errors.server.connection'
      }

      return {
        success: false,
        error: errorKey,
        originalError: result.error, // Keep original for debugging
        issues: result.issues,
      }
    }

    // If login is successful and we have a token, set it as a cookie
    if (result.token) {
      const cookieStore = await cookies()
      // Set the JWT token as an HttpOnly cookie for security
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
    console.error('Login error:', error)

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
