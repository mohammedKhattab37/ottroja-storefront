import { sdk } from "@/lib/config"
import { getCacheOptions } from "./cookies"

interface NavLinkItem {
  title: string
  url?: string
}

interface CmsItem {
  id: string
  position: string
  language: string
  name: string
  items: {
    [key: string]: NavLinkItem
  }
}

interface NavLinksResponse {
  items: CmsItem[]
}

export const listNavLinks = async (query?: Record<string, unknown>) => {
  const next = {
    ...(await getCacheOptions("NAV_LINKS")),
  }

  return sdk.client
    .fetch<NavLinksResponse>("/store/cms", {
      query: {
        ...query,
      },
      next,
      cache: "force-cache",
    })
    .then(({ items }) => items)
}

export const getNavLinks = async (
  locale?: string,
  query?: Record<string, unknown>
) => {
  const next = {
    ...(await getCacheOptions("NAV_LINKS")),
  }

  // Map locale to language code
  const language = locale === 'ar' ? 'AR' : 'EN'

  try {
    const response = await sdk.client.fetch<NavLinksResponse>(`/store/cms`, {
      query: {
        position: 'NAV_LINKS',
        ...query,
      },
      headers: {
        'Accept-Language': language,
        'Accept-Country': 'EG',
      },
      next,
      cache: "force-cache",
    })
    
    return response.items
  } catch (error) {
    console.error('Error in getNavLinks:', error)
    throw error
  }
}
