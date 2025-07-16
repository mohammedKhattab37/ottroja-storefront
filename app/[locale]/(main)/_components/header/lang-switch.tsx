'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { routing } from '@/i18n/routing'
import { locals } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

function LangSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    router.push(newPath)
    router.refresh()
  }

  const getLanguageInfo = (locale: string) => {
    return locals.find((item) => item.name == locale) || locals[0]
  }

  const getLanguageDisplayName = (locale: string) => {
    const names: Record<string, string> = {
      en: 'English',
      ar: 'العربية',
    }
    return names[locale] || locale
  }

  const currentLang = getLanguageInfo(locale)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="border-secondary focus:ring-primary h-fit rounded-full border-[1.5px] p-2 transition-colors hover:bg-gray-50 focus:ring-2 focus:outline-none"
        >
          <Image
            src={currentLang.flag}
            alt={currentLang.name}
            width={16}
            height={16}
            className="size-4"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {routing.locales.map((lang) => {
          const langInfo = getLanguageInfo(lang)
          return (
            <DropdownMenuItem
              key={lang}
              className="cursor-pointer"
              onClick={() => switchLanguage(lang)}
            >
              <Image
                src={langInfo.flag}
                alt={langInfo.name}
                width={16}
                height={16}
                className={cn('mr-2 size-4', locale !== lang ? 'opacity-75' : '')}
              />
              <span className={cn('text-sm', locale === lang ? 'font-medium' : '')}>
                {getLanguageDisplayName(lang)}
              </span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LangSwitch
