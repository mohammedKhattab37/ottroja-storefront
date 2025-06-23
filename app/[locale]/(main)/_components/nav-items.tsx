'use client'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

function NavItems({ direction }: { direction: string }) {
  const navLinks = [
    { title: 'Home Page', url: '' },
    { title: 'Special Offers', url: '#2' },
    { title: 'Honey Types', url: '#3' },
    { title: 'Honey Derivatives', url: '#4' },
    { title: 'Other Products', url: '#5' },
  ]

  const pathname = usePathname()

  return (
    <div
      className={cn(
        'text-secondary flex flex-wrap justify-center gap-5 py-6 md:gap-10',
        direction == 'rtl' ? 'flex-row-reverse' : '',
      )}
    >
      {navLinks.map((link) => {
        const isActive =
          (link.url === '' && pathname === '/') || (link.url && pathname === link.url)
        return (
          <Link
            className={cn(
              'w-fit',
              isActive
                ? 'text-primary grid justify-items-center gap-y-2 font-bold'
                : 'hover:underline',
            )}
            key={link.url}
            href={link.url || '/'}
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
