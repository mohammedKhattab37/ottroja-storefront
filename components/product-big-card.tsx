import { Product } from '@/app/[locale]/(main)/products/_actions/types'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ShoppingCart, Star } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from './ui/button'

function ProductBigCard({ direction, data }: { direction: string; data: Product }) {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const isAvailable =
    data.isActive &&
    data.variants.filter((variant) => variant.inventory && variant.inventory?.quantityAvailable > 0)
      .length > 0

  return (
    <Link
      href={`/products/${data.slug}`}
      className="bg-card border-border text-card-foreground relative block rounded-lg border-[1px] p-4 drop-shadow-md transition-shadow hover:shadow-lg"
      style={{ width: '295px', height: '284px' }}
    >
      <div className="absolute top-0 left-0 h-20 w-full overflow-hidden">
        <div
          className={cn(
            'absolute top-4 -left-8 max-w-fit min-w-[120px] -rotate-45 transform px-8 py-1 text-center text-xs font-bold text-white shadow-lg',
            isAvailable ? 'bg-success' : 'bg-destructive',
          )}
        >
          <span className="whitespace-nowrap">
            {isAvailable ? t('status.available') : t('status.not-available')}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="product"
          src={data.variants[0].images[0].url}
          width={180}
          height={180}
          quality={90}
          sizes="180px"
          className="absolute -top-20 h-[180px] w-auto"
        />
      </div>
      <div className="grid justify-items-center gap-y-7 pt-32">
        <div className="justify-items-center">
          <div className="mb-3 flex items-center gap-1" dir={direction}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                stroke="currentColor"
                className={cn(
                  'h-[1.2rem] w-[1.2rem]',
                  i < (data.rating ?? 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-[#E8E8E8] text-[#E8E8E8]',
                )}
              />
            ))}
          </div>
          <span className="font-bold">{locale === 'ar' ? data.name_ar : data.name_en}</span>
        </div>
        <div className="flex items-center gap-5">
          <Button
            dir={direction}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(`/products/${data.slug}`, '_self')
            }}
            className="border-card-foreground hover:border-primary hover:text-primary text-card-foreground rounded-full border-[1px] bg-transparent p-3 text-sm hover:bg-transparent"
          >
            <ShoppingCart />
            {t('buttons.buy')}
          </Button>
          <span dir={direction}>
            <span className="text-sm font-bold">
              {data.variants[0].price}{' '}
              <span className="font-semibold">/ {locale == 'ar' ? 'جنية مصري' : 'EGP'}</span>
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductBigCard
