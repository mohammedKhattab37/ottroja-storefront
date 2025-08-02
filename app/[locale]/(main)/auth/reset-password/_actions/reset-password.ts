'use server'

import { apiUrl } from '@/lib/constants'

export async function resetPassword(password: string, token: string) {
  try {
    const url = `${apiUrl}/auth/reset-password`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: password, token }),
    })

    const result = await response.json()
    if (!response.ok) {
      return {
        success: false,
        error: result.error || result.message || 'Failed to send reset request ',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Reset Password error:', error)
    return {
      success: false,
      error: 'Failed to send reset request',
    }
  }
}
