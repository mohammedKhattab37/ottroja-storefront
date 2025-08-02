'use server'

import { apiFetch } from '@/lib/utils'
import { ZodError } from 'zod'
import { RegisterErrorResponse } from '../../_auth/_actions/types'

interface AddressDataInput {
  customerId: string
  city: string
  state: string
  country: string
  district: string
  building: string
  apartment: string
  extra_address?: string
  zone: string
  postal_code: string
}

type shippingAddress = {
  id: string
}

export async function CreateAddress(
  validatedData: AddressDataInput,
): Promise<{ success: true; address: shippingAddress } | RegisterErrorResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const response = await apiFetch(
      `${baseUrl}/customers/address`,
      undefined,
      {
        method: 'POST',
        body: JSON.stringify(validatedData),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Address creation failed',
        issues: result.issues,
      }
    }

    return {
      success: true,
      address: result.address,
    }
  } catch (error) {
    console.error('Address Creation error:', error)

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
      error: 'An unexpected error occurred',
    }
  }
}
