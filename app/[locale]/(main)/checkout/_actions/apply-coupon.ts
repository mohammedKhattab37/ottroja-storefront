'use server'

import { ZodError } from 'zod'

interface CouponDataInput {
  code: string
  customerId: string
  orderTotal: number
}

export type couponDetails = {
  id: string
  name: string
  code: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  value: string
  amount: number
}

interface CouponErrorResponse {
  isValid: false
  error: string
  issues?: Array<{
    code: string
    path: (string | number)[]
    message: string
  }>
}

export async function ApplyCoupon(
  validatedData: CouponDataInput,
): Promise<{ isValid: boolean; coupon: couponDetails; error: string } | CouponErrorResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const response = await fetch(`${baseUrl}/coupons/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        isValid: false,
        error: result.error || 'Coupon validation failed',
        issues: result.issues,
      }
    }

    return {
      isValid: true,
      error: '',
      coupon: result.coupon || result,
    }
  } catch (error) {
    console.error('Coupon validation error:', error)

    // Handle validation errors
    if (error instanceof ZodError) {
      return {
        isValid: false,
        error: 'Validation failed',
        issues: error.issues,
      }
    }

    return {
      isValid: false,
      error: 'An unexpected error occurred',
    }
  }
}
