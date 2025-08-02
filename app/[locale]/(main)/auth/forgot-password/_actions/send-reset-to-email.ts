'use server'

import { apiUrl } from '@/lib/constants'

export async function sendResetToEmail(email: string) {
  try {
    const url = `${apiUrl}/auth/forget-password`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const result = await response.json()
    if (!response.ok) {
      return {
        success: false,
        error: result.error || result.message || 'Failed to send forgot password request ',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Forgot Password error:', error)
    return {
      success: false,
      error: 'Failed to send forgot password request',
    }
  }
}
