'use server'

import { apiUrl } from '@/lib/constants'

export interface Bundle {
  id: string
  nameEn: string
  nameAr: string
  slug: string
  briefTitleEn: string
  briefTitleAr: string
  briefTextEn: string
  briefTextAr: string
  imageUrl: string
  bundlePrice: number
  originalPrice: number
  savingsAmount: number
  isActive: boolean
  isFeatured: boolean

  bundleItems: BundleItem[]
}

export interface BundleItem {
  variant: {
    variant_name_en: string
    variant_name_ar: string
    weight_volume: number
    unit: string
    price: number
    product: {
      id: string
      name_en: string
      name_ar: string
      slug: string
      images: string[]
    }
  }
}

export interface BundlesResponse {
  bundles: Bundle[]
  pageCount: number
  total: number
}

export async function getBundles(): Promise<Bundle[]> {
  try {
    const response = await fetch(`${apiUrl}/bundles?limit=1`, {
      next: {
        revalidate: 3600, // 1 hour
        tags: ['bundles'],
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch bundles:', response.statusText)
      return []
    }

    const data: BundlesResponse = await response.json()
    return data.bundles || []
  } catch (error) {
    console.error('Error fetching bundles:', error)
    return []
  }
}
