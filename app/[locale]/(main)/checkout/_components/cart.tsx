import BannerButton from '@/components/banner-button'
import QuantityControls from '@/components/fragments/quantity-controls'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { paymentIcons } from '@/lib/constants'
import { useCartStore } from '@/stores/cart'
import { Trash } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { ProductVariant } from '../../products/_actions/types'

export interface cartDrawerItem {
  id: string
  name_ar: string
  name_en: string
  image: string
  slug: string
  quantity: number

  productVariant?: ProductVariant
  productVariantId?: string
}

export function Cart({ t }: { t: (key: string) => string }) {
  const { items, getSubtotal } = useCartStore()

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="grid divide-y overflow-y-auto p-5">
        {items.map((item: Omit<cartDrawerItem, 'cartId'>, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
      <div className="bg-filter-trigger grid gap-5 px-5 py-8">
        <div className="flex justify-between">
          <p className="font-bold">{t('total')}</p>
          <span className="content-end font-bold">
            <span className="text-lg">{getSubtotal()} </span>
            <span className="text-xs">/ جنيه مصري</span>
          </span>
        </div>
        <BannerButton
          text={t('go_payment')}
          url="/checkout"
          size="sm"
          className="w-full flex-1 rounded-full font-semibold"
        />
        <div className="flex w-fit gap-2 justify-self-center rounded-md px-2 py-0">
          {paymentIcons.map((icon) => (
            <Image
              key={icon.name}
              alt={icon.name}
              src={`/assets/payment/${icon.name}`}
              width={icon.size}
              height={icon.size}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CartItem({ item }: { item: cartDrawerItem }) {
  const { updateQuantity, removeItem } = useCartStore()
  const locale = useLocale()

  return (
    <div className="flex gap-3 py-4">
      <div className="bg-filter-trigger rounded-md px-6 py-2">
        <Image src={item.image} alt="" width={80} height={80} />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="grid gap-2 py-2.5">
            <Link href={item.slug} className="text-sm font-bold">
              {locale == 'ar' ? item.name_ar : item.name_en}
            </Link>
            <span className="text-xs font-medium">
              {locale == 'ar'
                ? item.productVariant?.variant_name_ar
                : item.productVariant?.variant_name_en}
            </span>
          </div>
          <Button
            variant={'vanilla'}
            size={'icon'}
            type="button"
            onClick={() => removeItem(item.id || '')}
          >
            <Trash className="size-5" />
          </Button>
        </div>
        <div className="flex justify-between">
          <span className="content-end text-sm">
            <span className="font-bold">{item.productVariant?.price} </span>
            <span className="text-xs font-semibold">/ جنيه مصري</span>
          </span>
          {item.id && (
            <QuantityControls
              quantity={item.quantity}
              addQuantity={() => updateQuantity(item.id, item.quantity + 1)}
              removeQuantity={() => updateQuantity(item.id, item.quantity - 1)}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  )
}
