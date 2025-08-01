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
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { Star } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Product } from '../_actions/types'
import ProductImageGallery from './_components/product-image-gallery'
import ProductTabsSection from './_components/product-tabs-section'

function ProductPageClient({
  productData,
  similarProducts,
  chosenVariant,
}: {
  productData: Product
  similarProducts: Product[]
  chosenVariant?: string
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
            images: item.images,
            inventory: item.inventory,
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
            images: item.images,
            inventory: item.inventory,
          })),
          benefits: productData.benefits_en,
          ingredients: productData.ingredients_en,
          warnings: productData.warnings_en,
        }

  const router = useRouter()

  const { addItem, isLoading, items } = useCartStore()
  const [selectedVariant, setSelectedVariant] = useState(
    translatedProduct.variants.find((variant) => variant.id == chosenVariant) ||
      translatedProduct.variants[0],
  )
  const [quantity, setQuantity] = useState(
    items.find((item) => item.productVariantId === translatedProduct.variants[0].id)?.quantity || 1,
  )
  const t = useTranslations('cart')
  const productT = useTranslations('products')

  // Check if the selected variant is in cart and get its current quantity
  const cartItemInfo = useMemo(() => {
    const cartItem = items.find((item) => item.productVariantId === selectedVariant.id)
    return {
      isInCart: !!cartItem,
      currentCartQuantity: cartItem?.quantity || 0,
      isSameQuantity: cartItem?.quantity === quantity,
    }
  }, [items, selectedVariant.id, quantity])

  // Determine if add button should be disabled
  const isAddButtonDisabled = useMemo(() => {
    return (
      isLoading ||
      !selectedVariant.inventory ||
      selectedVariant.inventory.quantityAvailable <= 0 ||
      (cartItemInfo.isInCart && cartItemInfo.isSameQuantity)
    )
  }, [isLoading, selectedVariant.inventory, cartItemInfo])

  const getButtonText = () => {
    if (cartItemInfo.isInCart) {
      if (cartItemInfo.isSameQuantity) {
        return t('in-cart')
      } else if (quantity > cartItemInfo.currentCartQuantity) {
        return t('add-more')
      } else {
        return t('update-quantity')
      }
    }
    return t('add')
  }

  const handleAddToCart = async () => {
    try {
      if (
        !selectedVariant.inventory ||
        selectedVariant.inventory.quantityAvailable <= 0 ||
        quantity > selectedVariant.inventory.quantityAvailable
      ) {
        toast.error('Not enough in stock')
        return
      }

      addItem({
        id: selectedVariant.id,
        name_ar: productData.name_ar,
        name_en: productData.name_en,
        quantity,
        slug: productData.slug,
        image: selectedVariant.images[0].url,
        productVariantId: selectedVariant.id,
        productVariant: productData.variants.find((variant) => variant.id == selectedVariant.id),
      })

      if (cartItemInfo.isInCart) {
        toast.success(productT('updated-cart'))
      } else {
        toast.success(productT('added-to-cart'))
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  return (
    <div className="overflow-hidden px-4 pb-64 md:px-0">
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
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      stroke="currentColor"
                      className={cn(
                        'h-[1.2rem] w-[1.2rem]',
                        i < (productData.reviewStats?.averageRating || productData.rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-white text-white',
                      )}
                    />
                  ))}
                </div>
                {productData.reviewStats && (
                  <span className="text-xs text-gray-600">
                    ({productData.reviewStats.totalReviews} {productT('reviews')})
                  </span>
                )}
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
          <div className="bg-filter-trigger relative grid gap-5 rounded-lg p-5" dir={direction}>
            {selectedVariant.compare_at_price && (
              <span className="bg-discount-badge absolute start-4 -top-3 rounded-full px-2 py-1 text-xs font-semibold text-white drop-shadow-xl">
                {productT('discount') +
                  ' ' +
                  Math.round(
                    ((selectedVariant.price - selectedVariant.compare_at_price) /
                      selectedVariant.price) *
                      100,
                  )}{' '}
                %
              </span>
            )}
            <div className="flex place-items-center justify-between">
              <div
                className={cn(
                  'text-card-foreground font-bold',
                  selectedVariant.compare_at_price ? 'flex items-center gap-2' : '',
                )}
              >
                <div>
                  <span className="text-2xl">
                    {' '}
                    {selectedVariant.compare_at_price
                      ? selectedVariant.compare_at_price
                      : selectedVariant.price}
                  </span>{' '}
                  / {translatedCurrency}
                </div>
                {selectedVariant.compare_at_price && (
                  <span
                    className={cn(
                      selectedVariant.compare_at_price ? 'text-xs line-through' : 'text-2xl',
                    )}
                  >
                    {' '}
                    {selectedVariant.price} / {translatedCurrency}
                  </span>
                )}
              </div>
              <span className="text-card-foreground text-xs font-semibold">
                {!selectedVariant.inventory || selectedVariant.inventory.quantityAvailable == 0 ? (
                  <div className="text-destructive">{productT('out-stock')}</div>
                ) : selectedVariant.inventory.quantityAvailable <= 10 ? (
                  <div className="text-warning">
                    {selectedVariant.inventory.quantityAvailable +
                      ' ' +
                      productT('number-in-stock')}
                  </div>
                ) : (
                  <div className="text-success">{productT('in-stock')} </div>
                )}
              </span>
            </div>

            <div className="flex w-full flex-wrap gap-2">
              {translatedProduct.variants.map((variant) => {
                const isActive = selectedVariant.id == variant.id
                return (
                  <Button
                    onClick={() => {
                      setSelectedVariant(variant)
                      setQuantity(
                        items.find((item) => item.productVariantId === variant.id)?.quantity || 1,
                      )
                      router.replace(`?variant_id=${variant.id}`)
                    }}
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
              disabled={isAddButtonDisabled}
              className="flex-1 rounded-full p-5 text-xs font-semibold"
            >
              {getButtonText()}
            </Button>
            <QuantityControls
              quantity={quantity}
              maxQuantity={selectedVariant.inventory?.quantityAvailable || undefined}
              disabled={
                isLoading ||
                !selectedVariant.inventory ||
                selectedVariant.inventory.quantityAvailable <= 0
              }
              addQuantity={() => setQuantity((old) => old + 1)}
              removeQuantity={() => setQuantity((old) => old - 1)}
            />
          </div>

          {/* Cart status indicator */}
          {cartItemInfo.isInCart && (
            <div className="mt-3 text-xs text-gray-600" dir={direction}>
              {cartItemInfo.currentCartQuantity} {productT('in-cart')}
            </div>
          )}
        </div>

        <ProductImageGallery productImages={selectedVariant.images} />
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
        reviews={productData.reviews}
      />

      {/* Related products */}
      <div className="w-screen max-w-full items-center pt-32">
        <Header title={productT('related')} direction={direction} />
        <Carousel
          opts={{
            align: 'start',
            containScroll: 'trimSnaps',
          }}
        >
          <CarouselContent className="items-center pt-40">
            {similarProducts.map((item, i) => (
              <CarouselItem
                key={i}
                dir={direction}
                className="basis-full justify-items-center sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
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
