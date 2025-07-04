import { sdk } from "@/lib/config"
import { getCacheOptions } from "./cookies"

interface HeroCmsItem {
  id: string
  position: string
  language: string
  name: string
  title: string
  sub_title: string
  button_destination: string
  button_text: string
  images: string[]
  items: Record<string, never>
}

interface HeroResponse {
  items: HeroCmsItem[]
}

export const getHeroData = async (
  locale?: string,
  query?: Record<string, unknown>
) => {
  const next = {
    ...(await getCacheOptions("HERO")),
  }

  // Map locale to language code
  const language = locale === 'ar' ? 'AR' : 'EN'

  try {
    const response = await sdk.client.fetch<HeroResponse>(`/store/cms`, {
      query: {
        position: 'HERO',
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
    console.error('Error in getHeroData:', error)
    throw error
  }
}
