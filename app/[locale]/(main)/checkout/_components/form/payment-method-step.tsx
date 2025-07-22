import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import { paymentSchema } from '@/zod/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Copy, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { createOrder } from '../_actions/create-order'

export type CheckoutPaymentData = z.infer<typeof paymentSchema>

function PaymentMethodStep({ t }: { t: (key: string) => string }) {
  const { next, customerId, couponCode, shippingAddressId, isSubmitting } = useCheckoutStore()
  const { isUserLoggedIn, items } = useCartStore()
  const [copied, setCopied] = useState(false)

  const form = useForm<CheckoutPaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {},
    mode: 'onChange',
  })
  const { control, watch } = form
  const paymentMethodField = watch('method')
  const availableMethods: {
    value: 'CASH_ON_DELIVERY' | 'INSTAPAY' | 'CREDIT_CARD' | 'WALLET'
    label: string
  }[] = [
    { value: 'CASH_ON_DELIVERY', label: t('step3.cash') },
    { value: 'INSTAPAY', label: t('step3.instapay.title') },
    { value: 'CREDIT_CARD', label: t('step3.card.title') },
    { value: 'WALLET', label: t('step3.e-wallet.title') },
  ]

  const PaymentMethodIcon = ({ method }: { method: string }) => {
    switch (method) {
      case 'CASH_ON_DELIVERY':
        return <Image src={'/assets/payment/cash-method.svg'} alt="" width={30} height={30} />
      case 'INSTAPAY':
        return <Image src={'/assets/payment/instapay.svg'} alt="" width={45} height={45} />
      case 'CREDIT_CARD':
        return <Image src={'/assets/payment/card-method.svg'} alt="" width={30} height={30} />
      case 'WALLET':
        return <Image src={'/assets/payment/e-wallet-method.svg'} alt="" width={30} height={30} />
      default:
        return <Image src={'/assets/payment/cash-method.svg'} alt="" width={30} height={30} />
    }
  }

  const handleNext = async () => {
    useCheckoutStore.setState({ isSubmitting: true })
    try {
      const result = await createOrder({
        isUser: await isUserLoggedIn(),
        data: {
          delivery: 70,
          orderItems: items.map((item) => ({
            quantity: item.quantity,
            unitPrice: item.productVariant?.price || 0,
            productVariantId: item.productVariantId || '',
          })),
          customerId: customerId || undefined,
          coupon_code: couponCode || '',
          shippingAddressId: shippingAddressId || '',
          paymentMethod: paymentMethodField,
        },
      })

      if (result) next()
    } catch (error) {
      console.log('Validation error:', error)
      form.trigger()
    }
    useCheckoutStore.setState({ isSubmitting: false })
  }

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('01113274044')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{t('step3.name')}</h2>
        </div>

        <div>
          <FormLabel>{t('step3.method')}</FormLabel>
          <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2">
            {availableMethods.map((method) => (
              <button
                key={method.value}
                type="button"
                disabled={isSubmitting}
                onClick={() => form.setValue('method', method.value)}
                className={cn(
                  'bg-background flex items-center justify-between rounded-lg p-4 text-xs font-bold transition-colors',
                  paymentMethodField === method.value
                    ? 'border-card-foreground text-card-foreground border-2'
                    : 'text-[#AEAEAE]',
                )}
              >
                <PaymentMethodIcon method={method.value} />
                <span className="flex items-center gap-2 text-sm font-medium">
                  {method.label}
                  <div
                    className={cn(
                      'h-[18px] w-[18px] rounded-full border p-0.5',
                      paymentMethodField === method.value
                        ? 'border-card-foreground'
                        : 'border-[#AEAEAE]',
                    )}
                  >
                    {paymentMethodField === method.value && (
                      <span className="bg-card-foreground flex h-full w-full rounded-full"></span>
                    )}
                  </div>
                </span>
              </button>
            ))}
          </div>
        </div>

        {paymentMethodField === 'INSTAPAY' && (
          <div>
            <Image
              src={'/assets/payment/instapay.svg'}
              className="bg-background mb-10 justify-self-center rounded-full"
              alt=""
              width={200}
              height={200}
            />
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="mb-1 font-medium">{t('step3.instapay.link-title')}</h4>
                  <p className="text-card-foreground text-xs font-normal">
                    {t('step3.instapay.link-description')}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() =>
                    window.open('https://ipn.eg/S/ehabshamseldin/instapay/8ElqWG', '_blank')
                  }
                >
                  {t('step3.instapay.link-btn')} <ExternalLink size={16} className="ml-2" />
                </Button>
              </div>
              <span className="bg-background aspect-square w-fit justify-self-center rounded-full p-4 text-center drop-shadow-xs">
                {t('step3.instapay.or')}
              </span>
              <div>
                <h4 className="my-1 text-sm font-medium">
                  {t('step3.instapay.send-number-title')}
                </h4>
                <div className="bg-background border-border flex items-center justify-between rounded-md border p-3">
                  <span className="font-mono text-lg">01113274044</span>
                  <Button variant="outline" size="sm" onClick={() => handleCopyNumber()}>
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copied ? t('step3.instapay.copied') : t('step3.instapay.copy')}
                  </Button>
                </div>
              </div>
              <div className="text-card-foreground mt-4 text-center text-sm font-semibold">
                {t('step3.instapay.receipt-number')}
              </div>
            </div>
          </div>
        )}

        {paymentMethodField === 'CREDIT_CARD' && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="cardHolder"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.card.owner')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('step3.card.owner')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cardNumber"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.card.number')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1234 5678 9012 3456" maxLength={19} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="expiryDate"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.card.date')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="MM/YY" maxLength={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cvv"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.card.ccv')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123" maxLength={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {paymentMethodField === 'WALLET' && (
          <div className="grid grid-cols-2">
            <FormField
              control={control}
              name="walletPhoneNo"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.e-wallet.number')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('step3.e-wallet.number')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          variant={'secondary'}
          type="button"
          disabled={isSubmitting}
          onClick={handleNext}
          className="rounded-full p-5 px-24 text-xs font-bold"
        >
          {t('next')}
        </Button>
      </div>
    </Form>
  )
}

export default PaymentMethodStep
