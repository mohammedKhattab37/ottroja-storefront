'use client'
import CustomDrawer from '@/components/custom-drawer'
import InputWithIcon from '@/components/input-with-icon'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Search, ShoppingCart } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { Cart } from '../../checkout/_components/cart'
import LangSwitch from './lang-switch'
import NavItems from './nav-items'
import { Profile } from './profile'

interface NavItem {
  title: string
  url?: string
}

function Header({ navLinks }: { navLinks?: NavItem[] }) {
  const t = useTranslations('homePage')
  const authT = useTranslations('auth')
  const cartT = useTranslations('cart')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="mt-8">
      <div className="container-padding flex flex-row-reverse items-center justify-between rounded-t-sm py-7 md:px-10">
        <div className="flex w-full items-center justify-end gap-4 sm:gap-6 md:mb-0 md:w-fit md:gap-8">
          <div className="hidden items-center lg:grid">
            <InputWithIcon
              name="search"
              classNames="bg-hero border-input-border text-secondary placeholder:text-secondary w-xl py-3 ps-8"
              placeholder={t('header.search')}
              direction={direction}
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
        <div className="text-secondary flex w-fit justify-end gap-3 sm:gap-4">
          <Profile authT={authT} direction={direction} userButtonText={t('header.user-button')} />

          <Button
            variant={'vanilla'}
            size={'icon'}
            className="border-secondary relative h-fit rounded-full border-[1.5px] p-2"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span className="bg-success absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white sm:h-5 sm:w-5 sm:text-xs">
              3
            </span>
            <ShoppingCart className="size-4" />
          </Button>
          <LangSwitch />
        </div>
        <CustomDrawer
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
          title={
            <div className="flex justify-items-center gap-2 text-sm font-bold">
              <ShoppingCart className="size-5" />
              {cartT('title')}
            </div>
          }
          contentDirection={direction}
          showInBigScreens={true}
        >
          <Cart t={cartT} />
        </CustomDrawer>
      </div>
      <NavItems direction={direction} navLinks={navLinks} />
    </div>
  )
}
export default Header
