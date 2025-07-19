'use server'

import { apiUrl } from '@/lib/constants'
import { CartItem } from '@/stores/cart'
import { headers } from 'next/headers'

export async function getServerCart() {
  const headersList = await headers()

  const requestHeaders = new Headers()
  const cookies = headersList.get('cookie')
  if (cookies) {
    requestHeaders.set('Cookie', cookies)
  }
  const response = await fetch(`${apiUrl}/cart`, {
    headers: requestHeaders,
  })

  if (!response.ok) {
    throw new Error('Failed to fetch cart')
  }
  return response.json()
}

export async function saveServerCart(items: CartItem[]) {
  const headersList = await headers()

  const requestHeaders = new Headers()
  requestHeaders.set('Content-Type', 'application/json')

  const cookies = headersList.get('cookie')
  if (cookies) {
    requestHeaders.set('Cookie', cookies)
  }

  const response = await fetch(`${apiUrl}/cart`, {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
    body: JSON.stringify({ items }),
  })

  if (!response.ok) {
    throw new Error('Failed to save cart')
  }
  return response.json()
}
