'use server'

import { apiUrl } from '@/lib/constants'
import { Bundle } from '../../_actions/get-bundles'

export async function getBundle(bundleId: string) {
  try {
    const url = `${apiUrl}/bundles/${bundleId}`
    const response = await fetch(url, {
      next: {
        revalidate: 3600, // 1 hour
        tags: ['product'],
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch bundle:', response.statusText)
      return {} as Bundle
    }

    const data: Bundle = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching bundle:', error)
    return {} as Bundle
  }
}
