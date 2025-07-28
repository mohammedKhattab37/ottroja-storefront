'use client'

import ProductBigCard from '@/components/product-big-card'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { Category } from '../../_actions/get-categories'
import { Product } from '../../products/_actions/types'
import PaginationBar from '../../products/_components/pagination-bar'
import { CategorySearchParams } from './page'

export default function CategoryPageClient({
  products,
  totalProducts,
  searchParams,
  currentCategory,
}: {
  products: Product[]
  totalProducts: number
  searchParams: CategorySearchParams
  currentCategory: Category | undefined
}) {
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  const categoryName = currentCategory
    ? locale === 'ar'
      ? currentCategory.nameAr
      : currentCategory.nameEn
    : 'Category'

  return (
    <div className="text-secondary max-width-container flex flex-col">
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
        <p className="text-center text-2xl font-bold">{categoryName}</p>
      </div>

      <div className="flex w-full flex-col" dir={contentDirection}>
        <div className="flex w-full flex-col pt-10 pb-64">
          {/* Products Flex Container */}
          <div className="flex flex-wrap justify-start gap-5 gap-y-24 pt-32">
            {products
              .filter((product) => product.isActive)
              .map((product) => (
                <ProductBigCard
                  key={product.id}
                  direction={contentDirection}
                  data={{
                    ...product,
                  }}
                />
              ))}
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
    </div>
  )
}
