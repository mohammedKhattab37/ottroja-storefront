import BannerButton from '@/components/banner-button'
import QuantityControls from '@/components/fragments/quantity-controls'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { paymentIcons } from '@/lib/constants'
import { dummyCartItems } from '@/lib/dummy-data'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export interface cartItem {
  id: number
  name: string
  category: string
  image: string
  url: string
  price: number
  currency: string
  quantity: number
}

export function Cart({ t }: { t: (key: string) => string }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="grid divide-y overflow-y-auto p-5">
        {dummyCartItems.map((item: cartItem, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
      <div className="bg-filter-trigger grid gap-5 px-5 py-8">
        <div className="flex justify-between">
          <p className="font-bold">{t('total')}</p>
          <span className="content-end font-bold">
            <span className="text-lg">
              {dummyCartItems.reduce((acc, item) => (acc += item.price * item.quantity), 0)}
            </span>
            <span className="text-xs">/ {dummyCartItems[0].currency}</span>
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

export function CartItem({ item }: { item: cartItem }) {
  const [quantity, setQuantity] = useState(item.quantity)

  return (
    <div className="flex gap-3 py-4">
      <div className="bg-filter-trigger rounded-md px-6 py-2">
        <Image src={item.image} alt="" width={80} height={80} />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="grid gap-2 py-2.5">
            <Link href={item.url} className="text-sm font-bold">
              {item.name}
            </Link>
            <span className="text-xs font-medium">{item.category}</span>
          </div>
          <Button variant={'vanilla'} size={'icon'}>
            <Trash className="size-5" />
          </Button>
        </div>
        <div className="flex justify-between">
          <span className="content-end text-sm">
            <span className="font-bold">{item.price} </span>
            <span className="text-xs font-semibold">/ {item.currency}</span>
          </span>
          <QuantityControls quantity={quantity} setQuantity={setQuantity} size="small" />
        </div>
      </div>
    </div>
  )
}
