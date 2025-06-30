'use client'
import InputWithIcon from '@/components/input-with-icon'
import { Link } from '@/i18n/navigation'
import { Search, ShoppingBag, UserRound } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Hero from './hero'
import NavItems from './nav-items'

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

interface HeaderProps {
  navLinks?: NavItem[]
  heroData?: HeroItem[]
}

function Header({ navLinks, heroData }: HeaderProps) {
  const t = useTranslations('homePage')
  const locale = useLocale()
  return (
    <div>
      <div className="border-border flex flex-row-reverse items-center justify-between border-b-2 px-4 py-2 sm:px-8 md:py-4 lg:px-24 xl:px-40">
        <div className="mb-2 flex w-full items-center justify-end gap-4 sm:gap-6 md:mb-0 md:w-fit md:gap-8">
          <InputWithIcon
            name="search"
            classNames="bg-input border-input-border text-secondary placeholder:text-secondary w-lg py-3 md:py-5"
            placeholder={t('header.search')}
            direction={locale == 'ar' ? 'rtl' : 'ltr'}
            icon={<Search />}
          />
          <Link href="">
            <Image
              src="/assets/ottroja-nav-icon.webp"
              alt=""
              width={60}
              height={60}
              className="h-20 w-20"
            />
          </Link>
        </div>
        <div className="text-secondary flex w-fit justify-end gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="hidden text-sm md:block" dir={locale == 'ar' ? 'rtl' : 'ltr'}>
              {t('header.user-button')} <span className="font-bold">Yaser</span>
            </span>
            <span className="border-secondary h-fit rounded-full border-[1.5px] p-2">
              <UserRound className="size-4" />
            </span>
          </div>
          <span className="border-secondary relative h-fit rounded-full border-[1.5px] p-2">
            <span className="bg-success absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white sm:h-5 sm:w-5 sm:text-xs">
              3
            </span>
            <ShoppingBag className="size-4" />
          </span>
        </div>
      </div>
      <NavItems direction={locale == 'ar' ? 'rtl' : 'ltr'} navLinks={navLinks} />
      <Hero direction={locale == 'ar' ? 'rtl' : 'ltr'} heroData={heroData} />
    </div>
  )
}
export default Header
