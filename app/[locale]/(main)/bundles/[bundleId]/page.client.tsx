'use client'
import QuantityControls from '@/components/fragments/quantity-controls'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Bundle } from '../../_actions/get-bundles'
import ProductImageGallery from '../../products/[productId]/_components/product-image-gallery'
import BundleDescription from './_components/bundle_description'

function BundlePageClient({ bundleData }: { bundleData: Bundle }) {
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'

  const translatedBundle =
    locale == 'ar'
      ? {
          name: bundleData.nameAr,
          brief_title: bundleData.briefTitleAr,
          brief_text: bundleData.briefTextAr,
          items: bundleData.bundleItems.map((item) => ({
            id: item.variant.product.id,
            variant_name: item.variant.product.name_ar + ' ' + item.variant.variant_name_ar,
          })),
        }
      : {
          name: bundleData.nameEn,
          brief_title: bundleData.briefTitleEn,
          brief_text: bundleData.briefTextEn,
          items: bundleData.bundleItems.map((item) => ({
            id: item.variant.product.id,
            variant_name: item.variant.product.name_en + ' ' + item.variant.variant_name_en,
          })),
        }

  const { addItem, items, isLoading } = useCartStore()
  const [quantity, setQuantity] = useState(
    items.find((item) => item.slug === bundleData.slug)?.quantity || 1,
  )
  const t = useTranslations('cart')
  const productT = useTranslations('products')

  // Check if the selected variant is in cart and get its current quantity
  const cartItemInfo = useMemo(() => {
    const cartItem = items.find((item) => item.slug === bundleData.slug)
    return {
      isInCart: !!cartItem,
      currentCartQuantity: cartItem?.quantity || 0,
      isSameQuantity: cartItem?.quantity === quantity,
    }
  }, [bundleData.slug, items, quantity])

  // Determine if add button should be disabled
  const isAddButtonDisabled = useMemo(() => {
    return (
      isLoading ||
      bundleData.bundleItems.some(
        (b_it) => b_it.variant.inventory && b_it.variant.inventory.quantityAvailable > 0,
      ) ||
      (cartItemInfo.isInCart && cartItemInfo.isSameQuantity)
    )
  }, [isLoading, bundleData, cartItemInfo])

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
        !bundleData.bundleItems.some(
          (b_it) =>
            b_it.variant.inventory &&
            b_it.variant.inventory.quantityAvailable > 0 &&
            quantity <= b_it.variant.inventory.quantityAvailable,
        )
      ) {
        toast.error('Not enough in stock')
        return
      }

      addItem({
        id: bundleData.slug,
        name_ar: bundleData.nameAr,
        name_en: bundleData.nameEn,
        quantity,
        slug: bundleData.slug,
        image: bundleData.imageUrl,
        bundleId: bundleData.id,
        bundle: bundleData,
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
          <div className="bg-filter-trigger relative min-h-32 w-full overflow-hidden rounded-lg p-5">
            <Image
              alt="Product header background"
              src={'/assets/illustrations/productp-header.svg'}
              fill
              quality={100}
              className="absolute start-0 top-0 object-cover"
            />
            <div className="relative z-10 mt-5" dir={direction}>
              <p className="text-2xl font-bold">{translatedBundle.name}</p>
            </div>
          </div>
          {/* brief Description */}
          <div className="py-5" dir={direction}>
            <p className="text-sm leading-8 font-bold">{translatedBundle.brief_title}</p>
            <span className="text-xs leading-8 font-medium">{translatedBundle.brief_text}</span>
          </div>
          {/* item/price */}
          <div className="bg-filter-trigger grid gap-5 rounded-lg p-5" dir={direction}>
            <p className="text-card-foreground flex items-center gap-2 font-bold">
              <span className="text-2xl"> {bundleData.bundlePrice}</span> / جنيه مصري
              <span className="text-xs line-through"> {bundleData.originalPrice} / جنيه مصري</span>
            </p>
            <div className="grid grid-cols-2 gap-2 p-4">
              <p className="text-card-foreground col-span-2 pb-4 font-bold">
                {productT('bundle-items')}
              </p>
              {translatedBundle.items.map((item) => {
                return (
                  <div key={item.variant_name} className="flex items-center gap-4">
                    <Image
                      alt="list item"
                      src={'/assets/illustrations/list-indicator.svg'}
                      width={25}
                      height={20}
                      quality={100}
                    />
                    {item.variant_name}
                  </div>
                )
              })}
            </div>
          </div>
          {/* controls */}
          <div className="flex gap-5 pt-8">
            <Button
              type="button"
              onClick={handleAddToCart}
              disabled={isAddButtonDisabled}
              variant={'secondary'}
              className="flex-1 rounded-full p-5 text-xs font-semibold"
            >
              {getButtonText()}
            </Button>
            <QuantityControls
              quantity={quantity}
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

        <ProductImageGallery
          productImages={Array.from(
            new Map(
              bundleData.bundleItems
                .flatMap((item) => item.variant.images)
                .map((img) => [img.id, img]),
            ).values(),
          )}
        />
      </div>

      {/* Bundle details */}
      <BundleDescription bundle={bundleData} language={locale} t={productT} />
    </div>
  )
}

export default BundlePageClient
