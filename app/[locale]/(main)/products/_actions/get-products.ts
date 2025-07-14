'use server'

import { apiUrl } from '@/lib/constants'
import { SearchParams } from '../page'
import { Product, ProductsResponse } from './types'

export async function getProducts({
  page = '1',
  limit = '12',
  search,
  category,
  min,
  max,
}: SearchParams): Promise<{ products: Product[]; total: number }> {
  try {
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(search && { search }),
      ...(category && { category }),
      ...(min !== undefined && { min: min.toString() }),
      ...(max !== undefined && { max: max.toString() }),
    })

    const url = `${apiUrl}/products?${queryParams.toString()}`
    const response = await fetch(url, {
      next: {
        revalidate: 3600, // 1 hour
        tags: ['products'],
      },
    })

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
