'use server'

import { apiFetch } from '@/lib/utils'
import { ZodError } from 'zod'

interface OrderItem {
  quantity: number
  unitPrice: number
  productVariantId?: string
}

interface CouponDataInput {
  code: string
  customerId: string
  orderTotal: number
  orderItems?: OrderItem[]
}

export type couponDetails = {
  id: string
  name: string
  code: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  value: string
  amount: number
  freeShipping?: boolean
  applicableVariants?: Array<{
    id: string
    productVariantId: string
    productVariant: {
      id: string
      sku: string
      variant_name_en: string
      variant_name_ar: string
    }
  }>
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

    const response = await apiFetch(
      `${baseUrl}/coupons/validate`,
      undefined,
      {
        method: 'POST',
        body: JSON.stringify(validatedData),
      }
    )

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response received:', text.substring(0, 200))
      return {
        isValid: false,
        error: 'Invalid response from server. Please try again.',
      }
    }

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
