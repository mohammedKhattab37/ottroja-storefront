'use server'

import { apiUrl } from '@/lib/constants'
import { Product, ProductsResponse } from './types'

export async function getProducts({
  page,
  limit,
  search,
}: {
  page?: string
  limit?: string
  search?: string
}): Promise<{ products: Product[]; total: number }> {
  try {
    const response = await fetch(
      `${apiUrl}/products?limit=${limit}&page=${page}${search ? '&search=' + search : ''}`,
      {
        next: {
          revalidate: 3600, // 1 hour
          tags: ['products'],
        },
      },
    )

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText)
      return { products: [], total: 0 }
    }

    const data: ProductsResponse = await response.json()
    return { products: data.products, total: data.total }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { products: [], total: 0 }
  }
}
