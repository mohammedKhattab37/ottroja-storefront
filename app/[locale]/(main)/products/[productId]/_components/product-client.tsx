'use client'
import Header from '@/components/header'
import ProductBigCard from '@/components/product-big-card'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { dummyProducts } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { Minus, Plus, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import ProductImageGallery, { imagesData } from './product-image-gallery'
import ProductTabsSection from './product-tabs-section'

interface ProductData {
  name: string
  category: string
  sub_title: string
  brief_description: string
  weight_packaging: string
  benefits: string[]
  ingredients: string[]
  warnings: string[]
  rating: number
  variants: { value: string; price: number }[]
  currency: string
  images: imagesData[]
}

function ProductClient({
  productData,
  direction,
}: {
  productData: ProductData
  direction: string
}) {
  const [selectedVariant, setSelectedVariant] = useState(productData.variants[0])
  const [quantity, setQuantity] = useState(1)
  const t = useTranslations('cart')
  const productT = useTranslations('products')

  const updateQuantity = (change: number) => {
    if (quantity + change < 1) {
      return
    }
    setQuantity((oldValue) => oldValue + change)
  }

  return (
    <div className="overflow-hidden">
      <div className="text-secondary grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className={'order-2 md:order-1'}>
          <div className="bg-filter-trigger relative w-full overflow-hidden rounded-lg p-5">
            <Image
              alt=""
              src={'/assets/illustrations/productp-header.svg'}
              width={100}
              height={100}
              className="absolute start-0 top-0 w-full"
            />
            <div className="relative z-10 grid gap-4" dir={direction}>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    stroke="currentColor"
                    className={cn(
                      'h-[1.2rem] w-[1.2rem]',
                      i < productData.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-white text-white',
                    )}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold">{productData.category}</p>
              <p className="text-2xl font-bold">{productData.name}</p>
            </div>
          </div>
          {/* brief Description */}
          <div className="py-5" dir={direction}>
            <p className="text-sm leading-8 font-bold">{productData.sub_title}</p>
            <span className="text-xs leading-8 font-medium">{productData.brief_description}</span>
          </div>
          {/* variants/prices */}
          <div className="bg-filter-trigger grid gap-5 rounded-lg p-5" dir={direction}>
            <p className="text-card-foreground text-sm font-bold">
              <span className="text-2xl"> {selectedVariant.price}</span> / {productData.currency}
            </p>
            <div className="grid auto-cols-auto grid-flow-col gap-2">
              {productData.variants.map((variant) => {
                const isActive = selectedVariant == variant
                return (
                  <Button
                    onClick={() => setSelectedVariant(variant)}
                    className={'rounded-lg p-6 text-xs font-bold'}
                    variant={isActive ? 'secondary' : 'input'}
                    key={variant.value}
                  >
                    {variant.value}
                  </Button>
                )
              })}
            </div>
          </div>
          {/* controls */}
          <div className="flex gap-5 pt-8">
            <Button variant={'secondary'} className="flex-1 rounded-full p-5 text-xs font-semibold">
              {t('add')}
            </Button>
            <div className="border-secondary flex items-center gap-2 rounded-lg border text-sm font-bold">
              <Button
                variant="ghost"
                size="icon"
                disabled={quantity == 1}
                onClick={() => updateQuantity(-1)}
              >
                <Minus className="size-5" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => updateQuantity(1)}>
                <Plus className="size-5" />
              </Button>
            </div>
          </div>
        </div>

        <ProductImageGallery productImages={productData.images} />
      </div>

      {/* Product details & reviews */}
      <ProductTabsSection
        productT={productT}
        direction={direction as 'ltr' | 'rtl' | undefined}
        description={{
          weight_packaging: productData.weight_packaging,
          benefits: productData.benefits,
          ingredients: productData.ingredients,
          warnings: productData.warnings,
        }}
      />

      {/* Related products */}
      <div className="pt-32">
        <Header title={productT('related')} direction={direction} />
        <Carousel
          opts={{
            align: 'start',
            containScroll: 'trimSnaps',
          }}
        >
          <CarouselContent className="pt-40">
            {dummyProducts.map((item, i) => (
              <CarouselItem
                key={i}
                dir={direction}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductBigCard direction={direction} data={item} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className={'mt-6 flex items-center justify-center space-x-4'}>
            <CarouselPrevious
              className={cn(
                'relative top-0 left-0 h-12 w-12 translate-x-0 translate-y-0 rounded-full',
              )}
            />

            <CarouselNext
              className={cn(
                'relative top-0 right-0 h-12 w-12 translate-x-0 translate-y-0 rounded-full',
              )}
            />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default ProductClient
