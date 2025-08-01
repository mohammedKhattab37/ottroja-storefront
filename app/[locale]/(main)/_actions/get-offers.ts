import { apiUrl } from '@/lib/constants'
import { OfferResponse, OffersApiResponse } from '../products/_actions/types'

export async function getOffers(): Promise<OfferResponse[]> {
  try {
    const response = await fetch(`${apiUrl}/offers/active`, {
      next: {
        revalidate: 3600, // 1 hour
        tags: ['offers'],
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch offers:', response.statusText)
      return []
    }

    const data: OffersApiResponse = await response.json()
    return data.offers
  } catch (error) {
    console.error('Error fetching offers:', error)
    return []
  }
}
