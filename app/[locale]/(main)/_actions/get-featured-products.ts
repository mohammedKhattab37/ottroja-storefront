'use server'

import { apiUrl } from '@/lib/constants'

export interface Category {
  id: string
  nameEn: string
  slug: string
}

export interface ProductVariant {
  id: string
  price: number
}

export interface ProductImage {
  id: string
  url: string
  isMain: boolean
}

export interface Product {
  id: string
  name_en: string
  name_ar: string
  slug: string
  description_en?: string
  description_ar?: string
  brief_description_en?: string
  brief_description_ar?: string
  imageUrl?: string
  categoryId?: string
  isFeatured?: boolean
  isActive?: boolean
  rating?: number
  createdAt: string
  updatedAt: string
  category?: Category
  variants: ProductVariant[]
  images: ProductImage[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

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
  return product.images?.find((img) => img.isMain) || product.images?.[0] || null
}
