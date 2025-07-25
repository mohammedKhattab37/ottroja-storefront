'use client'
import QuantityControls from '@/components/fragments/quantity-controls'
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
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { Star } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { Product } from '../_actions/types'
import ProductImageGallery from './_components/product-image-gallery'
import ProductTabsSection from './_components/product-tabs-section'

function ProductPageClient({
  productData,
  similarProducts,
}: {
  productData: Product
  similarProducts: Product[]
}) {
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'
  const translatedCurrency = locale == 'ar' ? 'جنيه مصري' : 'EGP'

  const translatedProduct =
    locale == 'ar'
      ? {
          name: productData.name_ar,
          brief_title: productData.brief_title_ar,
          brief_text: productData.brief_text_ar,
          category: productData.category?.nameAr,
          variants: productData.variants.map((item) => ({
            id: item.id,
            price: item.price,
            variant_name: item.variant_name_ar,
            compare_at_price: item.compare_at_price,
          })),
          benefits: productData.benefits_ar,
          ingredients: productData.ingredients_ar,
          warnings: productData.warnings_ar,
        }
      : {
          name: productData.name_en,
          brief_title: productData.brief_title_en,
          brief_text: productData.brief_text_en,
          category: productData.category?.nameEn,
          variants: productData.variants.map((item) => ({
            id: item.id,
            price: item.price,
            variant_name: item.variant_name_en,
            compare_at_price: item.compare_at_price,
          })),
          benefits: productData.benefits_en,
          ingredients: productData.ingredients_en,
          warnings: productData.warnings_en,
        }

  const [selectedVariant, setSelectedVariant] = useState(translatedProduct.variants[0])
  const [quantity, setQuantity] = useState(1)
  const t = useTranslations('cart')
  const productT = useTranslations('products')
  const { addItem, isLoading } = useCartStore()

  const handleAddToCart = async () => {
    try {
      addItem({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name_ar: productData.name_ar,
        name_en: productData.name_en,
        quantity,
        slug: productData.slug,
        image: productData.images[0].url,
        productVariantId: selectedVariant.id,
        productVariant: productData.variants.find((variant) => variant.id == selectedVariant.id),
      })

      console.log('Added to cart successfully!')
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  return (
    <div className="overflow-hidden pb-64">
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
                      i < (productData.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-white text-white',
                    )}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold">{translatedProduct.category}</p>
              <p className="text-2xl font-bold">{translatedProduct.name}</p>
            </div>
          </div>
          {/* brief Description */}
          <div className="py-5" dir={direction}>
            <p className="text-sm leading-8 font-bold">{translatedProduct.brief_title}</p>
            <span className="text-xs leading-8 font-medium">{translatedProduct.brief_text}</span>
          </div>
          {/* variants/prices */}
          <div className="bg-filter-trigger grid gap-5 rounded-lg p-5" dir={direction}>
            <p className="text-card-foreground text-sm font-bold">
              <span className="text-2xl"> {selectedVariant.price}</span> / {translatedCurrency}
            </p>
            <div className="flex w-full flex-wrap gap-2">
              {translatedProduct.variants.map((variant) => {
                const isActive = selectedVariant.id == variant.id
                return (
                  <Button
                    onClick={() => setSelectedVariant(variant)}
                    className={'flex-1 rounded-lg p-6 text-xs font-bold'}
                    variant={isActive ? 'secondary' : 'input'}
                    key={variant.id}
                  >
                    {variant.variant_name}
                  </Button>
                )
              })}
            </div>
          </div>
          {/* controls */}
          <div className="flex gap-5 pt-8">
            <Button
              type="button"
              onClick={handleAddToCart}
              variant={'secondary'}
              disabled={isLoading}
              className="flex-1 rounded-full p-5 text-xs font-semibold"
            >
              {t('add')}
            </Button>
            <QuantityControls
              quantity={quantity}
              disabled={isLoading}
              addQuantity={() => setQuantity((old) => old + 1)}
              removeQuantity={() => setQuantity((old) => old - 1)}
            />
          </div>
        </div>

        <ProductImageGallery productImages={productData.images} />
      </div>

      {/* Product details & reviews */}
      <ProductTabsSection
        productT={productT}
        direction={direction as 'ltr' | 'rtl' | undefined}
        description={{
          weight_packaging: '',
          benefits: translatedProduct.benefits,
          ingredients: translatedProduct.ingredients,
          warnings: translatedProduct.warnings,
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
            {similarProducts.map((item, i) => (
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

export default ProductPageClient
