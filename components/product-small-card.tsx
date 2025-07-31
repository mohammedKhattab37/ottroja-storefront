import { DiscountedVariantResponse } from '@/app/[locale]/(main)/products/_actions/types'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { ShoppingCart, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Button } from './ui/button'

function ProductSmallCard({
  locale,
  variant,
}: {
  locale: string
  variant: DiscountedVariantResponse
}) {
  const { addItem, isLoading } = useCartStore()
  const t = useTranslations('homePage')
  const productT = useTranslations('products')

  const discountAmount = Math.round(
    ((variant.price - (variant.compare_at_price || 0)) / variant.price) * 100,
  )
  const translatedCurrency = locale == 'ar' ? 'جنيه مصري' : 'EGP'
  const translatedName =
    locale == 'ar'
      ? variant.product.name_ar + ' - ' + variant.variant_name_ar
      : variant.product.name_en + ' - ' + variant.variant_name_en

  const handleAddToCart = async () => {
    try {
      if (!variant.inventory || variant.inventory.quantityAvailable <= 0) {
        toast.error('Not enough in stock')
        return
      }

      addItem({
        id: variant.id,
        name_ar: variant.product.name_ar,
        name_en: variant.product.name_en,
        quantity: 1,
        slug: variant.product.slug,
        image: variant.images[0].url,
        productVariantId: variant.id,
        productVariant: variant,
      })

      toast.success(productT('added-to-cart'))
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  return (
    <div className="bg-card border-border text-card-foreground relative flex gap-x-5 rounded-md border-[1px] px-10 py-3">
      <span className="bg-discount-badge absolute start-4 top-3 rounded-full px-2 py-1 text-xs font-semibold text-white drop-shadow-xl">
        {t('badges.discount') + ' ' + discountAmount} %
      </span>
      {variant.images && (
        <Image
          alt={translatedName}
          src={variant.images[0].url}
          width={50}
          height={120}
          quality={90}
          sizes="120px"
          style={{ objectFit: 'contain' }}
          className="h-24 w-24 self-center"
        />
      )}
      <div className="flex w-full flex-col justify-between py-3">
        {/* name & rating */}
        <div>
          <div className="mb-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                stroke="currentColor"
                className={cn(
                  'h-3.5 w-3.5',
                  i < 3 ? 'fill-yellow-400 text-yellow-400' : 'fill-[#E8E8E8] text-[#E8E8E8]',
                )}
              />
            ))}
          </div>
          <Link
            href={`/products/${variant.product.slug}?variant_id=${variant.id}`}
            className="text-sm font-bold"
          >
            {translatedName}
          </Link>
        </div>
        {/* prices & cart btn  */}
        <div className="flex w-full justify-between">
          <div>
            <span className="text-muted text-xs line-through">
              <span className="font-bold">{variant.price} </span>/ {translatedCurrency}
            </span>
            <span className="flex items-center gap-x-1">
              <Image
                alt="hot offer"
                src={'/assets/illustrations/hot-offer.svg'}
                width={20}
                height={20}
                quality={100}
              />
              <span className="font-bold">{variant.compare_at_price} </span>/ {translatedCurrency}
            </span>
          </div>
          <div className="content-end ps-10 pb-1.5">
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleAddToCart}
              className="border-card-foreground hover:border-primary hover:text-primary text-card-foreground w-14 rounded-3xl border-[1px] bg-transparent hover:bg-transparent"
            >
              <ShoppingCart className="size-[18px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSmallCard
