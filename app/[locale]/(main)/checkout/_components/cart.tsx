import QuantityControls from '@/components/fragments/quantity-controls'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { paymentIcons } from '@/lib/constants'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface cartItem {
  id: number
  name: string
  category: string
  image: string
  price: number
  quantity: number
}

export function Cart({ t }: { t: (key: string) => string }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="grid divide-y overflow-y-auto p-5">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="bg-filter-trigger grid gap-5 px-5 py-8">
        <div className="flex justify-between">
          <p className="font-bold">{t('total')}</p>
          <span className="content-end font-bold">
            <span className="text-lg">100 </span>
            <span className="text-xs">/ EPG</span>
          </span>
        </div>
        <Button variant={'secondary'} className="flex-1 rounded-full p-5 text-xs font-semibold">
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CartItem() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex gap-3 py-4">
      <div className="bg-filter-trigger rounded-md px-6 py-2">
        <Image src={'/assets/product-card.png'} alt="" width={80} height={80} />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="grid gap-2 py-2.5">
            <Link href={''} className="text-sm font-bold">
              Royal Honey
            </Link>
            <span className="text-xs font-medium">Bee Honey</span>
          </div>
          <Button variant={'vanilla'} size={'icon'}>
            <Trash className="size-5" />
          </Button>
        </div>
        <div className="flex justify-between">
          <span className="content-end text-sm">
            <span className="font-bold">100 </span>
            <span className="text-xs font-semibold">/ EPG</span>
          </span>
          <QuantityControls quantity={quantity} setQuantity={setQuantity} size="small" />
        </div>
      </div>
    </div>
  )
}
