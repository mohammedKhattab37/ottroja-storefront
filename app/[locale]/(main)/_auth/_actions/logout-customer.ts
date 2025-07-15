'use server'

import { cookies } from 'next/headers'

interface LogoutSuccessResponse {
  success: true
  message: string
}

interface LogoutErrorResponse {
  success: false
  error: string
}

type LogoutResponse = LogoutSuccessResponse | LogoutErrorResponse

export async function logoutCustomer(): Promise<LogoutResponse> {
  try {
    // Get the base URL for the API call
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    // Get current cookies to send with the request
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    // Make the API call to logout the customer
    const response = await fetch(`${baseUrl}/api/customers/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Logout failed',
      }
    }

    // Clear the JWT token cookie
    cookieStore.delete('auth-token')

    return {
      success: true,
      message: result.message || 'Logged out successfully',
    }
  } catch (error) {
    console.error('Logout error:', error)

    // Even if the API call fails, clear the local token
    const cookieStore = await cookies()
    cookieStore.delete('auth-token')

    return {
      success: false,
      error: 'An unexpected error occurred during logout',
    }
  }
}
