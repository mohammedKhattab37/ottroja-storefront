'use server'

import { cookies } from 'next/headers'

export interface ProductVariantImage {
  id: string
  url: string
  alt_text?: string
}

export interface Product {
  id: string
  name_en: string
  name_ar: string
  description_en: string | null
  description_ar: string | null
  slug?: string
}

export interface ProductVariant {
  id: string
  barcode: string
  compare_at_price: number | null
  createdAt: string
  images: ProductVariantImage[]
  price: number
  product: Product
  productId: string
  sku: string
  unit: string
  variant_name_ar: string
  variant_name_en: string
  weight_volume: number
}

export interface OrderItem {
  id: string
  orderId: string
  productName: string
  productVariant: ProductVariant
  productVariantId: string
  quantity: number
  sku: string
  totalPrice: number
  unitPrice: number
  variantName: string
  bundle: unknown | null
  bundleId: string | null
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  createdAt: string
  updatedAt: string
  gender: string | null
  phoneNumber: string | null
  email: string
  name: string
}

export interface ShippingAddress {
  id: string
  createdAt: string
  updatedAt: string
  city: string
  state: string
  country: string
  postalCode: string | null
  streetAddress: string
}

export interface Order {
  id: string
  orderNumber: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'CONFIRMED'
  deliveryStatus?:
    | 'ORDER_PLACED'
    | 'PREPARING'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'DELIVERY_FAILED'
    | 'RETURNED'
  totalAmount: number
  subTotal: number
  shippingAmount: number
  taxAmount: number
  discountAmount: number
  createdAt: string
  updatedAt: string
  orderItems: OrderItem[]
  customer: Customer
  customerId: string
  shippingAddress: ShippingAddress
  shippingAddressId: string
  paymentMethod: string
  paymentStatus: string
  notes: string | null
  internalNotes: string | null
  inventoryReserved: boolean
  inventoryReservedAt: string | null
  paidAt: string | null
  shippingDate: string | null
  deliveredAt: string | null
  cancellationReason: string | null
  refundReason: string | null
  couponId: string | null
  couponCode: string | null
  paymentReference: string | null
  transactionId: string | null
}

interface OrdersSuccessResponse {
  success: true
  orders: Order[]
}

interface OrdersErrorResponse {
  success: false
  error: string
}

type OrdersResponse = OrdersSuccessResponse | OrdersErrorResponse

export async function getUserOrders(): Promise<OrdersResponse> {
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

    const response = await fetch(`${baseUrl}/orders/by-user`, {
      method: 'GET',
      headers,
      credentials: 'include',
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
      return {
        success: false,
        error: result.error || result.message || 'Failed to fetch orders',
      }
    }

    return {
      success: true,
      orders: result.orders || result,
    }
  } catch (error) {
    console.error('Orders fetch error:', error)
    return {
      success: false,
      error: 'Failed to fetch orders',
    }
  }
}
