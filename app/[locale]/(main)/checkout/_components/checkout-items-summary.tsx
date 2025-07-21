import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { dummyCartItems } from '@/lib/dummy-data'
import { CartItem } from './cart'

function CheckoutItemsSummary({ t }: { t: (key: string) => string }) {
  return (
    <div className="bg-filter-trigger text-card-foreground h-fit rounded-lg p-4 shadow-sm">
      <div className="pb-5">
        <Label className="pb-4" htmlFor="promo">
          {t('promo')}
        </Label>
        <div className="flex gap-3">
          <Input className="py-5" placeholder={t('promo-placeholder')} type="text" id="promo" />
          <Button type="button" variant={'secondary'} className="py-5">
            {t('activate')}
          </Button>
        </div>
      </div>
      <div className="bg-background h-fit rounded-lg">
        <div className="grid divide-y overflow-y-auto px-3">
          {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {dummyCartItems.map((item: any, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="grid divide-y">
        <div className="grid gap-6 py-4">
          <div className="flex justify-between">
            <p className="text-sm font-normal">{t('sub-total')}</p>
            <span className="content-end text-sm">
              <span className="font-bold">
                {dummyCartItems.reduce((acc, item) => (acc += item.price * item.quantity), 0)}{' '}
              </span>
              <span className="text-xs font-semibold">/ {dummyCartItems[0].currency}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-normal">{t('delivery-fee')}</p>
            <span className="content-end text-sm">
              <span className="font-bold">50 </span>
              <span className="text-xs font-semibold">/ {dummyCartItems[0].currency}</span>
            </span>
          </div>
        </div>
        <div className="flex justify-between py-6 text-sm font-bold">
          <p>{t('total')}</p>
          <span className="content-end">
            <span className="text-[16px]">
              {dummyCartItems.reduce((acc, item) => (acc += item.price * item.quantity), 0) +
                50}{' '}
            </span>
            <span>/ {dummyCartItems[0].currency}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItemsSummary
