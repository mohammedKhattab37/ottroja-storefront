'use client'

import CustomDrawer from '@/components/custom-drawer'
import ProductBigCard from '@/components/product-big-card'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { Category } from '../_actions/get-categories'
import { Product } from './_actions/types'
import FiltersSidebar from './_components/filters-sidebar'
import PaginationBar from './_components/pagination-bar'
import SearchInput from './_components/search-input'
import { SearchParams } from './page'

export default function ProductsPageClient({
  products,
  categories,
  totalProducts,
  searchParams,
}: {
  products: Product[]
  categories: Category[]
  totalProducts: number
  searchParams: SearchParams
}) {
  const t = useTranslations('products')
  const filtersT = useTranslations('filters')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const filterParams = {
    category: searchParams.category,
    min: searchParams.min,
    max: searchParams.max,
  }

  return (
    <div className="text-secondary container-padding grid">
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
          <FiltersSidebar
            dir={contentDirection}
            categories={categories}
            filtersT={filtersT}
            filters={filterParams}
          />
        </div>

        <div className="col-span-full pt-20 pb-64 lg:col-span-3 lg:border-s-2 lg:border-s-[#FBE9D1]">
          <div className="grid lg:ps-10">
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
              <SearchInput placeholder={t('search')} contentDirection={contentDirection} />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-x-5 gap-y-28 px-0 pt-32 sm:grid-cols-2 xl:grid-cols-3">
              {products.filter(product => product.isActive).map((product) => (
                <ProductBigCard
                  key={product.id}
                  direction={contentDirection}
                  data={{
                    ...product,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <PaginationBar
            totalProducts={totalProducts}
            currentPage={Number(searchParams.page) || 1}
            itemsPerPage={Number(searchParams.limit) || 12}
            direction={contentDirection}
          />
        </div>
      </div>

      {isDrawerOpen && (
        <CustomDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          title={t('filters')}
          contentDirection={contentDirection}
        >
          <FiltersSidebar
            dir={contentDirection}
            categories={categories}
            filtersT={filtersT}
            filters={filterParams}
          />
        </CustomDrawer>
      )}
    </div>
  )
}
