'use server'

import { apiUrl } from '@/lib/constants'
import { Product } from './types'

export async function getProduct(productId: string) {
  try {
    const url = `${apiUrl}/products/${productId}`
    const response = await fetch(url, {
      next: {
        revalidate: 3600, // 1 hour
        tags: ['product'],
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText)
      return {} as Product
    }

    const data: Product = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    return {} as Product
  }
}
