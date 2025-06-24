import { getNavLinks } from '@/data/nav-links'
import { getLocale } from 'next-intl/server'
import Header from './Header'

interface NavItem {
  title: string
  url?: string
}

async function HeaderWrapper() {
  const locale = await getLocale()
  let navLinks: NavItem[] = []
  
  try {
    // Fetch nav links from backend
    const navLinksData = await getNavLinks(locale)
    
    // Check if navLinksData exists and is an array
    if (navLinksData && Array.isArray(navLinksData) && navLinksData.length > 0) {
      // Transform the data structure from backend to component format
      navLinks = navLinksData.flatMap(cmsItem => 
        cmsItem.items ? Object.entries(cmsItem.items).map(([, item]) => ({
          title: item.title,
          url: item.url || ''
        })) : []
      )
    }
  } catch (error) {
    console.error('Failed to fetch nav links:', error)
    // navLinks will remain empty array, Header will use defaults
  }
  
  return <Header navLinks={navLinks} />
}

export default HeaderWrapper 