'use server'

import { createApiHeaders } from '@/lib/utils'
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

export async function getCustomerSession(locale?: string): Promise<SessionResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    // Collect cookies manually and format into header string
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ')

    const headers = createApiHeaders(locale, {
      Cookie: cookieHeader,
    })
    // Remove Content-Type for GET requests
    delete headers['Content-Type']

    const response = await fetch(`${baseUrl}/customers/auth/session`, {
      method: 'GET',
      headers,
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
