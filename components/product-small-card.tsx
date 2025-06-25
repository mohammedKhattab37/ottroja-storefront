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
  old_price: number
  new_price: number
  currency: string
  discount: number
}

function ProductSmallCard({ direction, product }: { direction: string; product: ProductData }) {
  const t = useTranslations('homePage')

  return (
    <div
      className="bg-card border-border text-card-foreground relative grid grid-flow-col gap-x-5 rounded-md border-[1px] px-10 py-3"
      dir={direction}
    >
      <span className="bg-discount-badge absolute start-4 top-3 rounded-full px-2 py-1 text-xs font-semibold text-white drop-shadow-xl">
        {t('badges.discount') + ' ' + product.discount} %
      </span>
      <Image
        alt={product.name}
        src={product.image}
        width={58}
        height={58}
        quality={100}
        style={{ objectFit: 'contain' }}
        className="self-center"
      />
      <div className="flex flex-col justify-between py-3">
        {/* name & rating */}
        <div>
          <div className="mb-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                stroke="currentColor"
                className={cn(
                  'h-3.5 w-3.5',
                  i < product.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-[#E8E8E8] text-[#E8E8E8]',
                )}
              />
            ))}
          </div>
          <Link href={product.url} className="text-sm font-bold">
            {product.name}
          </Link>
        </div>
        {/* prices & cart btn  */}
        <div className="flex w-full justify-between">
          <div>
            <span className="text-muted text-xs line-through">
              <span className="font-bold">{product.old_price} </span>/ {product.currency}
            </span>
            <span className="flex items-center gap-x-1">
              <Image alt="hot offer" src={'/assets/hot-offer.webp'} width={20} height={20} />
              <span className="font-bold">{product.new_price} </span>/ {product.currency}
            </span>
          </div>
          <div className="content-end ps-10 pb-1.5">
            <Button className="border-card-foreground hover:border-primary hover:text-primary text-card-foreground w-14 rounded-3xl border-[1px] bg-transparent hover:bg-transparent">
              <ShoppingCart className="size-[18px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSmallCard
