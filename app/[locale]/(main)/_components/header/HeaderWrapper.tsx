import { getNavLinks } from '@/data/nav-links'
import { getHeroData } from '@/data/hero'
import { getLocale } from 'next-intl/server'
import Header from './Header'

interface NavItem {
  title: string
  url?: string
}

interface HeroItem {
  id: string
  title: string
  sub_title: string
  button_destination: string
  button_text: string
  images: string[]
}

async function HeaderWrapper() {
  const locale = await getLocale()
  let navLinks: NavItem[] = []
  let heroData: HeroItem[] = []
  
  try {
    // Fetch nav links and hero data from backend
    const [navLinksData, heroDataResponse] = await Promise.all([
      getNavLinks(locale),
      getHeroData(locale)
    ])
    
    // Transform nav links data
    if (navLinksData && Array.isArray(navLinksData) && navLinksData.length > 0) {
      navLinks = navLinksData.flatMap(cmsItem => 
        cmsItem.items ? Object.entries(cmsItem.items).map(([, item]) => ({
          title: item.title,
          url: item.url || ''
        })) : []
      )
    }
    
    // Transform hero data
    if (heroDataResponse && Array.isArray(heroDataResponse) && heroDataResponse.length > 0) {
      heroData = heroDataResponse.map(item => ({
        id: item.id,
        title: item.title,
        sub_title: item.sub_title,
        button_destination: item.button_destination,
        button_text: item.button_text,
        images: item.images
      }))
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    // Data will remain empty arrays, Header will use defaults
  }
  
  return <Header navLinks={navLinks} heroData={heroData} />
}

export default HeaderWrapper 