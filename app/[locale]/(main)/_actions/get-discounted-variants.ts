import { apiUrl } from '@/lib/constants'
import { DiscountedVariantResponse } from '../products/_actions/types'

export async function getDiscountedVariants() {
  try {
    const response = await fetch(`${apiUrl}/product-variants?has_discount=true&limit=6`, {
      next: {
        revalidate: 3600, // 1 hour
        tags: ['variants', 'discounted-variants'],
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch discounted variants:', response.statusText)
      return []
    }

    const data: DiscountedVariantResponse[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching discounted variants:', error)
    return []
  }
}
