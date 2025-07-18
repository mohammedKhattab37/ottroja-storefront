import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ShoppingCart, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from './ui/button'

interface ProductData {
  name: string
  url: string
  rating: number
  image: string
  price: number
  currency: string
  inStock: boolean
}

function ProductBigCard({ direction, data }: { direction: string; data: ProductData }) {
  const t = useTranslations('homePage')

  return (
    <div className="bg-card border-border text-card-foreground relative rounded-sm border-[1px] p-6 drop-shadow-md">
      <div className="absolute top-0 left-0 h-20 w-full overflow-hidden">
        <div
          className={cn(
            'absolute top-4 -left-8 max-w-fit min-w-[120px] -rotate-45 transform px-8 py-1 text-center text-xs font-bold text-white shadow-lg',
            data.inStock ? 'bg-success' : 'bg-destructive',
          )}
        >
          <span className="whitespace-nowrap">
            {data.inStock ? t('status.available') : t('status.not-available')}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          alt="product"
          src={data.image}
          width={120}
          height={210}
          className="absolute -top-20"
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
                  i < data.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-[#E8E8E8] text-[#E8E8E8]',
                )}
              />
            ))}
          </div>
          <Link href={data.url} className="font-bold">
            {data.name}
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <Button
            dir={direction}
            className="border-card-foreground hover:border-primary hover:text-primary text-card-foreground rounded-full border-[1px] bg-transparent p-3 text-sm hover:bg-transparent"
          >
            <ShoppingCart />
            {t('buttons.buy')}
          </Button>
          <span dir={direction}>
            <span className="font-bold">{data.price} </span>/ {data.currency}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductBigCard
