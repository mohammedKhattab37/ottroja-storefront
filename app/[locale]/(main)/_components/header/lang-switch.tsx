'use client'

import { Button } from '@/components/ui/button'
import { routing } from '@/i18n/routing'
import { locals } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

function LangSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    router.push(newPath)
    router.refresh()
    setIsOpen(false)
  }

  const getLanguageInfo = (locale: string) => {
    return locals.find((item) => item.name == locale) || locals[0]
  }

  const currentLang = getLanguageInfo(locale)

  return (
    <div className="relative inline-block text-left">
      <Button type="button" size={'icon'} variant={'vanilla'} onClick={() => setIsOpen(!isOpen)}>
        <Image
          src={currentLang.flag}
          alt={currentLang.name}
          width={20}
          height={20}
          className="h-full w-full"
        />
      </Button>

      {isOpen && (
        <div className="ring-opacity-5 bg-filter-trigger ring-border absolute -right-2 z-50 mt-1 w-fit origin-top-right rounded-md p-2 shadow-lg ring-1 focus:outline-none">
          <div className="grid gap-1">
            {routing.locales.map((lang) => {
              const langInfo = getLanguageInfo(lang)
              return (
                <Button
                  type="button"
                  variant={'vanilla'}
                  size={'icon'}
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                >
                  <Image
                    src={langInfo.flag}
                    alt={langInfo.name}
                    width={20}
                    height={20}
                    className={cn(
                      'h-fit w-full',
                      locale !== lang ? 'opacity-75 hover:opacity-100' : '',
                    )}
                  />
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

export default LangSwitch
