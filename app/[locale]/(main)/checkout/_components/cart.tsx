import QuantityControls from '@/components/fragments/quantity-controls'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@/i18n/navigation'
import { paymentIcons } from '@/lib/constants'
import { useCartStore } from '@/stores/cart'
import { Trash } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { Bundle } from '../../_actions/get-bundles'
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
  bundle?: Bundle
  bundleId?: string
}

export function Cart({
  t,
  setIsDrawerOpen,
}: {
  t: (key: string) => string
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { items, getSubtotal, isLoading } = useCartStore()
  const locale = useLocale()
  const translatedCurrency = locale == 'ar' ? 'جنيه مصري' : 'EGP'
  const router = useRouter()

  return (
    <div className="flex h-full flex-col justify-between">
      {isLoading && (
        <div className="bg-filter-trigger/50 align-items-center absolute h-full w-full content-center">
          <div className="border-t-input m-auto h-10 w-10 animate-spin rounded-full border-4 border-black/40"></div>
        </div>
      )}
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
            <span className="text-xs">/ {translatedCurrency}</span>
          </span>
        </div>
        <Button
          disabled={items.length == 0}
          variant={'secondary'}
          onClick={() => {
            router.push('/checkout')
            setIsDrawerOpen(false)
          }}
          className="w-full flex-1 rounded-full font-semibold"
        >
          {t('go_payment')}
        </Button>
        <div className="flex w-fit gap-2 justify-self-center rounded-md px-2 py-0">
          {paymentIcons.map((icon) => (
            <Image
              key={icon.name}
              alt={icon.name}
              src={`/assets/payment/${icon.name}`}
              width={icon.size}
              height={icon.size}
              quality={100}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CartItem({
  item,
  disableControls = false,
}: {
  item: cartDrawerItem
  disableControls?: boolean
}) {
  const { updateQuantity, removeItem } = useCartStore()
  const locale = useLocale()
  const translatedCurrency = locale == 'ar' ? 'جنيه مصري' : 'EGP'

  return (
    <div className="flex gap-3 py-4">
      <div className="bg-filter-trigger rounded-md px-6 py-2">
        <Image 
          src={item.image} 
          alt={locale == 'ar' ? item.name_ar : item.name_en} 
          width={100} 
          height={100} 
          quality={90}
          sizes="100px"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="grid gap-2 py-2.5">
            <Link href={item.slug} className="text-sm font-bold">
              {locale == 'ar' ? item.name_ar : item.name_en}
            </Link>
            <span className="text-xs font-medium">
              {locale == 'ar'
                ? item.productVariant?.variant_name_ar || item.bundle?.briefTitleAr
                : item.productVariant?.variant_name_en || item.bundle?.briefTitleEn}
            </span>
          </div>
          {!disableControls && (
            <Button
              variant={'vanilla'}
              size={'icon'}
              type="button"
              onClick={() => removeItem(item.id || '')}
            >
              <Trash className="size-5" />
            </Button>
          )}
        </div>
        <div className="flex justify-between">
          <span className="content-end text-sm">
            <span className="font-bold">
              {item.productVariant?.price || item.bundle?.bundlePrice}{' '}
            </span>
            <span className="text-xs font-semibold">/ {translatedCurrency}</span>
          </span>
          {item.id && !disableControls && (
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
