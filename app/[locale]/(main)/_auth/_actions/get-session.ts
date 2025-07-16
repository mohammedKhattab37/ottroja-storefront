'use server'

import { cookies } from 'next/headers'
import type { CustomerUser } from './types'

interface SessionSuccessResponse {
  success: true
  customer: CustomerUser
}

interface SessionErrorResponse {
  success: false
  error: string
}

type SessionResponse = SessionSuccessResponse | SessionErrorResponse

export async function getCustomerSession(): Promise<SessionResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    // Collect cookies manually and format into header string
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ')

    const response = await fetch(`${baseUrl}/customers/auth/session`, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
    })

    const result = await response.json()
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Session not found',
      }
    }

    return {
      success: true,
      customer: result.customer,
    }
  } catch (error) {
    console.error('Session error:', error)
    return {
      success: false,
      error: 'Failed to get session',
    }
  }
}
