'use client'

import InputWithIcon from '@/components/input-with-icon'
import ProductBigCard from '@/components/product-big-card'
import { Button } from '@/components/ui/button'
import { Filter, Search, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import FiltersSidebar from './_components/filters-sidebar'
import PaginationBar from './_components/pagination-bar'

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { per_page?: string; page?: string }
}) {
  const t = useTranslations('products')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'
  const totalProducts = 100
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const dummyProduct = {
    name: 'Royal Honey',
    image: '/assets/product-card.png',
    url: '#',
    price: 300,
    currency: 'SAR',
    rating: 4,
    inStock: true,
  }

  return (
    <div className="text-secondary grid">
      <div className="relative bg-[#F7F1E1] p-32">
        <div>
          <Image
            src={'/assets/illustrations/thin-jar.svg'}
            width={32}
            height={32}
            className="absolute end-[10%] top-14 -rotate-[26deg]"
            alt=""
          />
          <Image
            src={'/assets/illustrations/sun.svg'}
            width={50}
            height={50}
            className="absolute end-1/3 top-4"
            alt=""
          />
          <Image
            src={'/assets/illustrations/bee.svg'}
            width={75}
            height={75}
            className="absolute end-1/5 bottom-10 scale-x-[-1]"
            alt=""
          />
          <Image
            src={'/assets/illustrations/bee.svg'}
            width={75}
            height={75}
            className="absolute start-1/4 top-8"
            alt=""
          />
          <Image
            src={'/assets/illustrations/big-jar.svg'}
            width={55}
            height={55}
            className="absolute start-1/5 bottom-14 rotate-[32deg]"
            alt=""
          />
          <Image
            src={'/assets/illustrations/cloud.svg'}
            width={60}
            height={60}
            className="absolute start-[10%] top-16"
            alt=""
          />
        </div>
        <p className="text-center text-2xl font-bold">{t('header')}</p>
      </div>

      <div className="grid lg:grid-cols-4" dir={contentDirection}>
        <div className="col-span-1 hidden p-5 pt-20 lg:block xl:p-10">
          <p className="mb-32 font-semibold">{t('filters')}</p>
          <FiltersSidebar dir={contentDirection} />
        </div>

        <div className="col-span-full pt-20 lg:col-span-3 lg:border-s-2 lg:border-s-[#FBE9D1]">
          <div className="grid ps-4 lg:ps-10">
            <div className="flex items-center gap-4 lg:block">
              {/* Small screen filters btn */}
              <Button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                variant={'input'}
                className="bg-input hover:bg-input lg:hidden"
              >
                <Filter className="size-5" />
                <span className="text-sm font-medium">{t('filters')}</span>
              </Button>

              {/* Search Input */}
              <div className="flex-1">
                <InputWithIcon
                  name="search"
                  classNames="bg-input border-input-border text-secondary placeholder:text-secondary py-3 ps-8"
                  placeholder={t('search')}
                  direction={contentDirection}
                  icon={<Search className="size-5" />}
                  iconWrapperClasses="top-1/5"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-x-5 gap-y-28 px-0 pt-32 sm:grid-cols-2 xl:grid-cols-3">
              <ProductBigCard direction={contentDirection} data={dummyProduct} />
              <ProductBigCard direction={contentDirection} data={dummyProduct} />
              <ProductBigCard direction={contentDirection} data={dummyProduct} />
              <ProductBigCard direction={contentDirection} data={dummyProduct} />
              <ProductBigCard direction={contentDirection} data={dummyProduct} />
              <ProductBigCard direction={contentDirection} data={dummyProduct} />
            </div>
          </div>

          {/* Pagination */}
          <PaginationBar
            totalProducts={totalProducts}
            currentPage={Number(searchParams.page) || 1}
            itemsPerPage={Number(searchParams.per_page) || 12}
            direction={contentDirection}
          />
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        >
          {/* Drawer  */}
          <div
            className={`bg-background fixed top-0 bottom-0 z-60 w-80 max-w-[85vw] transform shadow-xl ${
              contentDirection === 'rtl' ? 'right-0 translate-x-0' : 'left-0 translate-x-0'
            }`}
            onClick={(e) => e.stopPropagation()}
            dir={contentDirection}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h2 className="text-secondary text-lg font-semibold">{t('filters')}</h2>
              <Button onClick={() => setIsDrawerOpen(false)} variant={'outline'}>
                <X className="text-secondary size-4" />
              </Button>
            </div>

            <div className="h-full overflow-y-auto p-5 pb-20">
              <FiltersSidebar dir={contentDirection} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
