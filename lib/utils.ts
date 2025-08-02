import { Bundle } from '@/app/[locale]/(main)/_actions/get-bundles'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateBundleAvailability = (bundle: Bundle) => {
  // Calculate how many complete bundles can be made
  let maxBundles = Infinity
  let hasOutOfStock = false

  bundle.bundleItems.forEach((b_it) => {
    if (!b_it.variant.inventory || b_it.variant.inventory.quantityAvailable === 0) {
      hasOutOfStock = true
      maxBundles = 0
      return
    }

    // Calculate how many bundles this variant can support
    const bundlesFromThisVariant = Math.floor(
      b_it.variant.inventory.quantityAvailable / b_it.quantity,
    )

    maxBundles = Math.min(maxBundles, bundlesFromThisVariant)
  })

  if (hasOutOfStock || maxBundles === 0) {
    return { status: 'out-of-stock', availableQuantity: 0 }
  } else if (maxBundles <= 10) {
    return { status: 'low-stock', availableQuantity: maxBundles }
  } else {
    return { status: 'in-stock', availableQuantity: maxBundles }
  }
}

/**
 * Creates headers with Accept-Language based on current locale
 */
export function createApiHeaders(locale?: string, additionalHeaders?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  }

  if (locale) {
    headers['Accept-Language'] = locale === 'ar' ? 'ar' : 'en'
  } else if (typeof window !== 'undefined') {
    // Client-side: try to get locale from URL path
    const pathSegments = window.location.pathname.split('/')
    const pathLocale = pathSegments[1]
    if (pathLocale === 'ar' || pathLocale === 'en') {
      headers['Accept-Language'] = pathLocale
    }
  }

  return headers
}

/**
 * Get locale from server-side headers (for server actions)
 */
export async function getServerLocale(): Promise<string | undefined> {
  if (typeof window !== 'undefined') return undefined
  
  try {
    const { headers } = await import('next/headers')
    const headersList = await headers()
    const referer = headersList.get('referer')
    
    if (referer) {
      const url = new URL(referer)
      const pathSegments = url.pathname.split('/')
      const pathLocale = pathSegments[1]
      if (pathLocale === 'ar' || pathLocale === 'en') {
        return pathLocale
      }
    }
  } catch (error) {
    console.warn('Failed to get server locale:', error)
  }
  
  return undefined
}

/**
 * Enhanced fetch with automatic Accept-Language header
 */
export async function apiFetch(
  url: string,
  locale?: string,
  options: RequestInit = {}
): Promise<Response> {
  // Auto-detect locale if not provided
  const resolvedLocale = locale || await getServerLocale()
  const headers = createApiHeaders(resolvedLocale, options.headers as Record<string, string>)
  
  return fetch(url, {
    ...options,
    headers,
  })
}
