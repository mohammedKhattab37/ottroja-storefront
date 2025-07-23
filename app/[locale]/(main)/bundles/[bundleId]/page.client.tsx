'use client'
import QuantityControls from '@/components/fragments/quantity-controls'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
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

  const [quantity, setQuantity] = useState(1)
  const t = useTranslations('cart')
  const productT = useTranslations('products')
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = async () => {
    try {
      addItem({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name_ar: bundleData.nameAr,
        name_en: bundleData.nameEn,
        quantity,
        slug: bundleData.slug,
        image: bundleData.imageUrl,
      })

      console.log('Added to cart successfully!')
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  return (
    <div className="container-padding overflow-hidden pb-64">
      <div className="text-secondary grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className={'order-2 md:order-1'}>
          <div className="bg-filter-trigger relative min-h-32 w-full overflow-hidden rounded-lg p-5">
            <Image
              alt=""
              src={'/assets/illustrations/productp-header.svg'}
              width={100}
              height={100}
              className="absolute start-0 top-0 w-full"
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
            <div className="grid auto-cols-auto grid-flow-col gap-2">
              {translatedBundle.items.map((item) => {
                return (
                  <div
                    className={
                      'bg-input border-input-border text-secondary rounded-lg border p-6 text-xs font-bold'
                    }
                    key={item.id}
                  >
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
              variant={'secondary'}
              className="flex-1 rounded-full p-5 text-xs font-semibold"
            >
              {t('add')}
            </Button>
            <QuantityControls
              quantity={quantity}
              addQuantity={() => setQuantity((old) => old + 1)}
              removeQuantity={() => setQuantity((old) => old - 1)}
            />
          </div>
        </div>

        <ProductImageGallery
          productImages={bundleData.bundleItems
            .map((item) => item.variant.product.images)
            .flatMap((arr) => arr.map((img) => img))}
        />
      </div>

      {/* Bundle details */}

      <BundleDescription bundle={bundleData} language={locale} t={productT} />
    </div>
  )
}

export default BundlePageClient
