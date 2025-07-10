'use server'

import { apiUrl } from '@/lib/constants'

export interface Category {
  id: string
  nameEn: string
  nameAr: string
  slug: string
  descriptionEn?: string
  descriptionAr?: string
  imageUrl?: string
  parentId?: string | null
  isActive?: boolean
  sortOrder?: number
  createdAt: string
  updatedAt: string
}

export interface CategoriesResponse {
  data: Category[]
  pageCount: number
  total: number
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${apiUrl}/categories`, {
      next: {
        revalidate: 3600, // 1 hour
        tags: ['categories'],
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.statusText)
      return []
    }

    const data: CategoriesResponse = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
