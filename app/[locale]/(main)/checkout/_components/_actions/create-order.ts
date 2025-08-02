'use server'

import { apiUrl } from '@/lib/constants'
import { headers } from 'next/headers'

export interface OrderData {
  isUser: boolean
  data: {
    delivery: number
    openPackageFee?: number
    orderItems?: {
      quantity: number
      unitPrice: number
      productVariantId?: string
      bundleId?: string
    }[]
    customerId?: string
    coupon_code: string
    shippingAddressId: string
    paymentMethod: 'CASH_ON_DELIVERY' | 'INSTAPAY' | 'CREDIT_CARD' | 'WALLET'
  }
}

export interface InventoryError {
  error: string
  details: string[]
}

export interface CreateOrderResult {
  success: boolean
  inventoryError?: InventoryError
}

export async function createOrder(data: OrderData): Promise<CreateOrderResult> {
  const headersList = await headers()
  const requestHeaders = new Headers()
  requestHeaders.set('Content-Type', 'application/json')
  let params = 'checkout=true'

  if (!data.isUser) {
    params += '&guest=true'
  } else {
    const cookies = headersList.get('cookie')
    if (cookies) {
      requestHeaders.set('Cookie', cookies)
    }
  }

  const response = await fetch(`${apiUrl}/orders?${params}`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(data.data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    
    console.log('Response status:', response.status)
    console.log('Error data:', errorData)
    
    // Check if it's an inventory error
    if (errorData?.error === 'Insufficient inventory for requested items' && errorData?.details) {
      console.log('Inventory error detected:', errorData)
      return {
        success: false,
        inventoryError: errorData as InventoryError
      }
    }
    
    throw new Error('Failed to create an order')
  }

  return { success: true }
}
