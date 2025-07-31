'use server'

import { cookies } from 'next/headers'

interface SubmitReviewData {
  orderId: string
  productId: string
  title: string
  content?: string
  rating: number
}

interface ReviewSuccessResponse {
  success: true
  review: {
    id: string
    title: string
    content: string
    rating: number
  }
}

interface ReviewErrorResponse {
  success: false
  error: string
}

type ReviewResponse = ReviewSuccessResponse | ReviewErrorResponse

export async function submitProductReview(data: SubmitReviewData): Promise<ReviewResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    // Collect cookies manually and format into header string
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ')

    // Extract token from cookies for Authorization header
    const tokenCookie =
      cookieStore.get('auth_token') || cookieStore.get('token') || cookieStore.get('access_token')
    const authToken = tokenCookie?.value

    const headers: Record<string, string> = {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
    }

    // Add Authorization header if token exists
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`
    }

    const requestPayload = {
      orderId: data.orderId,
      productId: data.productId,
      title: data.title,
      ...(data.content && data.content.trim() !== '' && { content: data.content }),
      rating: data.rating,
    }

    console.log('Submitting review with payload:', requestPayload)
    console.log('Request headers:', headers)

    const response = await fetch(`${baseUrl}/reviews`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(requestPayload),
    })

    // Check if the response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Non-JSON response received:', contentType)
      const textResponse = await response.text()
      console.error('Response text:', textResponse.substring(0, 200))
      return {
        success: false,
        error: 'Invalid response format from server',
      }
    }

    const result = await response.json()

    if (!response.ok) {
      console.error('Review submission failed:', {
        status: response.status,
        statusText: response.statusText,
        result,
      })
      return {
        success: false,
        error: result.error || result.message || `Failed to submit review (${response.status})`,
      }
    }

    return {
      success: true,
      review: result.review || result,
    }
  } catch (error) {
    console.error('Review submission error:', error)
    return {
      success: false,
      error: 'Failed to submit review',
    }
  }
}
