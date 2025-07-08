'use client'
import InputWithIcon from '@/components/input-with-icon'
import { Link } from '@/i18n/navigation'
import { Search, ShoppingBag, UserRound } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import NavItems from './nav-items'

interface NavItem {
  title: string
  url?: string
}

function Header({ navLinks }: { navLinks?: NavItem[] }) {
  const t = useTranslations('homePage')
  const locale = useLocale()
  return (
    <div className="mt-8">
      <div className="container-padding flex flex-row-reverse items-center justify-between rounded-t-sm py-7 md:px-10">
        <div className="flex w-full items-center justify-end gap-4 sm:gap-6 md:mb-0 md:w-fit md:gap-8">
          <div className="hidden items-center lg:grid">
            <InputWithIcon
              name="search"
              classNames="bg-hero border-input-border text-secondary placeholder:text-secondary w-xl py-3 ps-8"
              placeholder={t('header.search')}
              direction={locale == 'ar' ? 'rtl' : 'ltr'}
              icon={<Search className="size-5" />}
              iconWrapperClasses="top-1/5"
            />
          </div>
          <Link href="">
            <Image
              src="/assets/logo/header-logo.svg"
              alt=""
              width={85}
              height={85}
              className="!h-20 max-h-[85px] min-h-[85px] !w-20 max-w-[85px] min-w-[85px]"
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
    </div>
  )
}
export default Header
