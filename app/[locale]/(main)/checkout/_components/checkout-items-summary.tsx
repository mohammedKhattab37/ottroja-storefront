import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import { Check } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { ApplyCoupon, couponDetails } from '../_actions/apply-coupon'
import { cartDrawerItem, CartItem } from './cart'

function CheckoutItemsSummary({ t }: { t: (key: string) => string }) {
  const { items, getTotalPrice, getSubtotal, delivery } = useCartStore()
  const { currentStep, customerId, isLastStep } = useCheckoutStore()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [coupon, setCoupon] = useState<couponDetails>({
    id: '',
    name: '',
    code: '',
    type: 'FIXED_AMOUNT',
    value: '',
    amount: 0,
  })

  const locale = useLocale()
  const translatedCurrency = locale == 'ar' ? 'جنيه مصري' : 'EGP'

  const isCouponApplied = coupon.amount > 0 || coupon.type === 'FREE_SHIPPING'

  const handleSubmit = async () => {
    setIsLoading(true)
    setError('')

    try {
      if (customerId == null) {
        return
      }

      const appliedCoupon = await ApplyCoupon({
        code: coupon.code,
        customerId: customerId,
        orderTotal: getTotalPrice(),
      })

      if (appliedCoupon.isValid) {
        setCoupon(appliedCoupon.coupon)
        useCartStore.setState({ couponAmount: appliedCoupon.coupon.amount || 0 })
        useCheckoutStore.setState({ couponCode: appliedCoupon.coupon.code || null })
        setError('')
      } else {
        setError(appliedCoupon.error)
        setCoupon((prev) => ({ ...prev, amount: 0 }))
      }
    } catch (error) {
      console.log('Validation error:', error)
      setError('Validation error')
      setCoupon((prev) => ({ ...prev, amount: 0 }))
    }
    setIsLoading(false)
    console.log(coupon)
  }

  const handleRemoveCoupon = () => {
    setCoupon({
      id: '',
      name: '',
      code: '',
      type: 'FIXED_AMOUNT',
      value: '',
      amount: 0,
    })
    setError('')
    useCartStore.setState({ couponAmount: 0 })
    useCheckoutStore.setState({ couponCode: null })
  }

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value
    setError('')
    setCoupon((prev) => ({
      ...prev,
      code: newCode,
      ...(newCode !== prev.code && {
        id: '',
        name: '',
        amount: 0,
      }),
    }))
  }

  return (
    <div className="bg-filter-trigger text-card-foreground h-fit rounded-lg p-4 shadow-sm">
      {currentStep >= 2 && (
        <div className="pb-5">
          <Label className="pb-4" htmlFor="promo">
            {t('promo')}
          </Label>

          {isCouponApplied && (
            <div className="mb-1 flex w-fit items-center justify-between rounded-md border border-green-200 bg-green-50 px-2 py-1">
              <Check className="text-success stroke-2" />
              {(coupon.type === 'FREE_SHIPPING' || coupon.amount > 0) && (
                <span className="text-xs text-green-600">{t('coupons.applied')}</span>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <div className="grid flex-1">
              <Input
                className="py-5"
                placeholder={t('promo-placeholder')}
                type="text"
                id="promo"
                disabled={isLoading || isCouponApplied || isLastStep()}
                value={coupon.code}
                onChange={handleCouponCodeChange}
              />
              <span className="text-warning ms-1 mt-1 text-[10px]">{error}</span>
            </div>

            {!isCouponApplied ? (
              <Button
                type="button"
                disabled={isLoading || !coupon.code.trim() || isLastStep()}
                variant={'secondary'}
                onClick={handleSubmit}
                className="py-5"
              >
                {isLoading ? t('applying') : t('activate')}
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                onClick={handleRemoveCoupon}
                className="py-5"
              >
                {t('remove')}
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="bg-background h-fit rounded-lg">
        <div className="grid divide-y overflow-y-auto px-3">
          {items.map((item: cartDrawerItem, index) => (
            <CartItem key={index} item={item} disableControls={isLastStep()} />
          ))}
        </div>
      </div>

      <div className="grid divide-y">
        <div className="grid gap-5 py-4">
          <div className="flex justify-between">
            <p className="text-sm font-normal">{t('sub-total')}</p>
            <span className="content-end text-xs">
              <span className="font-bold">{getSubtotal()} </span>
              <span className="font-semibold">/ {translatedCurrency}</span>
            </span>
          </div>

          {currentStep >= 2 && (
            <div className="flex justify-between">
              <p className="text-sm font-normal">{t('delivery-fee')}</p>
              <div>
                {coupon.type == 'FREE_SHIPPING' && (
                  <span className="text-success px-2">{t('free')}</span>
                )}
                <span
                  className={cn(
                    'content-end text-xs',
                    coupon.type == 'FREE_SHIPPING' ? 'line-through' : '',
                  )}
                >
                  <span className="font-bold">{delivery} </span>
                  <span className="font-semibold">/ {translatedCurrency}</span>
                </span>
              </div>
            </div>
          )}

          {currentStep >= 2 && coupon.amount > 0 && (
            <div className="flex justify-between">
              <p className="text-sm font-normal">{t('coupons.discount')}</p>

              <span className="text-success content-end text-xs">
                <span className="font-bold">{coupon.amount}- </span>
                <span className="font-semibold">/ {translatedCurrency}</span>
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between py-6 text-sm font-bold">
          <p>{t('total')}</p>
          <span className="content-end">
            <span className="text-[16px]">{getTotalPrice(coupon.type == 'FREE_SHIPPING')} </span>
            <span>/{translatedCurrency}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItemsSummary
