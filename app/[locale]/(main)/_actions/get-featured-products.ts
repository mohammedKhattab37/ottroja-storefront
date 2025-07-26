'use server'

import { apiUrl } from '@/lib/constants'
import { Product, ProductImage, ProductsResponse } from '../products/_actions/types'

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${apiUrl}/products?isFeatured=true&isActive=true&limit=20`, {
      next: {
        revalidate: 3600, // 1 hour
        tags: ['products', 'featured-products'],
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch featured products:', response.statusText)
      return []
    }

    const data: ProductsResponse = await response.json()
    return data.products || []
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Helper function to get main image for a product
export async function getMainProductImage(product: Product): Promise<ProductImage | null> {
  const firstVariant = product.variants?.[0]
  if (!firstVariant?.images?.length) return null

  return firstVariant.images.find((img) => img.isMain) || firstVariant.images[0] || null
}
