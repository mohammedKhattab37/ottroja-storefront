'use client'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  url?: string
}

interface NavItemsProps {
  direction: string
  navLinks?: NavItem[]
}

function NavItems({ direction, navLinks }: NavItemsProps) {
  // Use provided navLinks or fallback to default
  const defaultNavLinks = [
    { title: 'Home Page', url: '' },
    { title: 'Special Offers', url: '#2' },
    { title: 'Honey Types', url: '#3' },
    { title: 'Honey Derivatives', url: '#4' },
    { title: 'Other Products', url: '#5' },
  ]

  const displayNavLinks = navLinks || defaultNavLinks

  const pathname = usePathname()

  return (
    <div
      className={cn(
        'text-secondary bg-hero border-border flex flex-wrap justify-center gap-5 rounded-b-sm border-[1px] !border-t-0 py-6 md:gap-10',
        direction == 'rtl' ? 'flex-row-reverse' : '',
      )}
    >
      {displayNavLinks.map((link) => {
        const linkUrl = link.url || '/'

        // Extract pathname from full URL if it's a full URL
        const linkPathname = linkUrl.startsWith('http') ? new URL(linkUrl).pathname : linkUrl

        // Remove locale prefix from linkPathname for comparison
        // e.g., "/ar" -> "/" or "/ar/about" -> "/about"
        const normalizedLinkPath = linkPathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'

        const isActive =
          (normalizedLinkPath === '/' && pathname === '/') ||
          (normalizedLinkPath !== '/' && pathname === normalizedLinkPath)
        return (
          <Link
            className={cn(
              'text-secondary w-fit',
              isActive
                ? 'text-primary grid justify-items-center gap-y-2 font-bold'
                : 'hover:underline',
            )}
            key={link.url}
            href={linkPathname}
          >
            {link.title}
            {isActive && <span className="bg-primary h-1.5 w-1/2 rounded-2xl"></span>}
          </Link>
        )
      })}
    </div>
  )
}

export default NavItems
