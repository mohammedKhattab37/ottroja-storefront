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

  const discountAmount =
    variant.compare_at_price && variant.price != null
      ? Math.round(((variant.compare_at_price - variant.price) / variant.compare_at_price) * 100)
      : 0

  const translatedCurrency = locale === 'ar' ? 'جنيه مصري' : 'EGP'
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
    <div
      className={cn(
        'bg-card border-border text-card-foreground relative flex gap-x-5 rounded-md border-[1px] px-10 py-3',
        locale === 'ar' ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <span
        className={cn(
          'bg-discount-badge absolute top-3 rounded-full px-2 py-1 text-xs font-semibold text-white drop-shadow-xl',
          locale === 'ar' ? 'end-4' : 'start-4',
        )}
      >
        %{t('badges.discount') + '  ' + discountAmount}
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
      <div
        className={cn(
          'flex w-full flex-col justify-between py-3',
          locale === 'ar' ? 'text-right' : 'text-left',
        )}
      >
        {/* name & rating */}
        <div>
          <div
            className={cn(
              'mb-2 flex items-center gap-1',
              locale === 'ar' ? 'flex-row-reverse' : 'flex-row',
            )}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                stroke="currentColor"
                className={cn(
                  'h-3.5 w-3.5',
                  i < 5 ? 'fill-yellow-400 text-yellow-400' : 'fill-[#E8E8E8] text-[#E8E8E8]',
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
        <div
          className={cn(
            'flex w-full justify-between',
            locale === 'ar' ? 'flex-row-reverse' : 'flex-row',
          )}
        >
          <div className={cn(locale === 'ar' ? 'text-right' : 'text-left')}>
            <span className="text-muted text-xs line-through">
              {locale === 'en' ? (
                <>
                  <span className="font-bold">{variant.compare_at_price} </span>/{' '}
                  {translatedCurrency}
                </>
              ) : (
                <>
                  <span className="font-bold">{variant.compare_at_price} </span> /
                  {translatedCurrency}
                </>
              )}
            </span>
            <span
              className={cn(
                'flex items-center gap-x-1',
                locale === 'ar' ? 'flex-row-reverse' : 'flex-row',
              )}
            >
              {locale === 'en' ? (
                <>
                  <Image
                    alt="hot offer"
                    src={'/assets/illustrations/hot-offer.svg'}
                    width={20}
                    height={20}
                    quality={100}
                  />
                  <span className="font-bold">{variant.price} </span>/ {translatedCurrency}
                </>
              ) : (
                <>
                  <span className="font-bold">{variant.price} </span> {translatedCurrency}
                  <Image
                    alt="hot offer"
                    src={'/assets/illustrations/hot-offer.svg'}
                    width={20}
                    height={20}
                    quality={100}
                  />
                </>
              )}
            </span>
          </div>
          <div className={cn('content-end pb-1.5', locale === 'ar' ? 'pe-10' : 'ps-10')}>
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
