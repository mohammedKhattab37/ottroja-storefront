'use server'

import { apiUrl } from '@/lib/constants'
import { headers } from 'next/headers'

export interface OrderData {
  isUser: boolean
  data: {
    delivery: number
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

export async function createOrder(data: OrderData): Promise<boolean> {
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
    throw new Error('Failed to create an order')
  }

  return true
}
