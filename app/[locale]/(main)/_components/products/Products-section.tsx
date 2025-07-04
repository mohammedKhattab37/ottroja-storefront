'use client'
import Header from '@/components/header'
import ProductBigCard from '@/components/product-big-card'
import { Button } from '@/components/ui/button'
import { cn, getCategoriesList } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

function ProductsSection() {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const [selectedType, setSelectedType] = useState('All')
  const categoriesList = getCategoriesList(useTranslations('categories'))
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

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
    <div>
      <Header title={t('sections.products')} direction={contentDirection} />
      <div
        className={cn(
          'text-secondary mt-5 flex flex-wrap justify-center gap-5 py-6',
          contentDirection == 'rtl' ? 'flex-row-reverse' : '',
        )}
      >
        <Button
          onClick={() => setSelectedType('All')}
          className={cn(
            'w-fit rounded-full text-sm',
            selectedType == 'All'
              ? 'text-secondary-foreground bg-secondary hover:bg-secondary/95'
              : 'text-primary border-[1px] border-[#A66E28] bg-transparent hover:bg-transparent',
          )}
        >
          {t('buttons.all')}
        </Button>
        {categoriesList.map((item) => {
          const isActive = selectedType == item.name

          return (
            <Button
              onClick={() => setSelectedType(item.name)}
              className={cn(
                'w-fit rounded-full text-sm',
                isActive
                  ? 'text-secondary-foreground bg-secondary hover:bg-secondary/95'
                  : 'text-primary border-[1px] border-[#A66E28] bg-transparent hover:bg-transparent',
              )}
              key={item.url}
            >
              {item.name}
            </Button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-28 px-16 pt-40 sm:px-20 md:grid-cols-2 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
        <ProductBigCard direction={contentDirection} data={dummyProduct} />
        <ProductBigCard direction={contentDirection} data={dummyProduct} />
        <ProductBigCard direction={contentDirection} data={dummyProduct} />
        <ProductBigCard direction={contentDirection} data={dummyProduct} />
        <ProductBigCard direction={contentDirection} data={dummyProduct} />
      </div>
    </div>
  )
}

export default ProductsSection
