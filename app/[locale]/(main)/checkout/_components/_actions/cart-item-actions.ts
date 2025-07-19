'use server'

import { apiUrl } from '@/lib/constants'
import { CartItem } from '@/stores/cart'
import { headers } from 'next/headers'

export async function addItemToDB(item: CartItem): Promise<CartItem> {
  const headersList = await headers()

  const requestHeaders = new Headers()
  requestHeaders.set('Content-Type', 'application/json')

  const cookies = headersList.get('cookie')
  if (cookies) {
    requestHeaders.set('Cookie', cookies)
  }

  const response = await fetch(`${apiUrl}/cart/new-item`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(item),
  })

  if (!response.ok) {
    throw new Error('Failed to add item to cart')
  }

  return response.json()
}

export async function removeItemFromDB(itemId: string): Promise<void> {
  const headersList = await headers()

  const requestHeaders = new Headers()
  const cookies = headersList.get('cookie')
  if (cookies) {
    requestHeaders.set('Cookie', cookies)
  }
  const response = await fetch(`${apiUrl}/cart/${itemId}`, {
    headers: requestHeaders,
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to remove cart item')
  }
}

export async function updateItemInDB(itemId: string, quantity: number): Promise<void> {
  const headersList = await headers()

  const requestHeaders = new Headers()
  requestHeaders.set('Content-Type', 'application/json')

  const cookies = headersList.get('cookie')
  if (cookies) {
    requestHeaders.set('Cookie', cookies)
  }
  const response = await fetch(`${apiUrl}/cart/${itemId}`, {
    method: 'PATCH',
    headers: requestHeaders,
    body: JSON.stringify({ quantity }),
  })

  if (!response.ok) {
    throw new Error('Failed to update cart item')
  }
}
