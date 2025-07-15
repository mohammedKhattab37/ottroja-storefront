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
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    // Make the API call to login the customer
    const response = await fetch(`${baseUrl}/api/customers/auth/login`, {
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
        error: result.error || 'Login failed',
        issues: result.issues,
      }
    }

    // If login is successful and we have a token, set it as a cookie
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
    console.error('Login error:', error)

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
      error: 'An unexpected error occurred during login',
    }
  }
}
