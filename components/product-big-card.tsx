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

  return (
    <div className="bg-card border-border text-card-foreground relative rounded-sm border-[1px] p-4 drop-shadow-md">
      <div className="absolute top-0 left-0 h-20 w-full overflow-hidden">
        <div
          className={cn(
            'absolute top-4 -left-8 max-w-fit min-w-[120px] -rotate-45 transform px-8 py-1 text-center text-xs font-bold text-white shadow-lg',
            data.isActive ? 'bg-success' : 'bg-destructive',
          )}
        >
          <span className="whitespace-nowrap">
            {data.isActive ? t('status.available') : t('status.not-available')}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="product"
          src={data.images[0].url}
          width={0}
          height={240}
          sizes="100vw"
          className="absolute -top-20 h-[180px] w-auto"
        />
      </div>
      <div className="grid justify-items-center gap-y-7 pt-36">
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
          <Link href={`/products/${data.slug}`} className="font-bold">
            {locale === 'ar' ? data.name_ar : data.name_en}
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Button
            dir={direction}
            onClick={() => window.open(`/products/${data.slug}`, '_self')}
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
    </div>
  )
}

export default ProductBigCard
