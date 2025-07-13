import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { UseFormReturn } from 'react-hook-form'
import { CheckoutFormData } from './checkout-form'

function PaymentMethodStep({
  t,
  form,
}: {
  t: (key: string) => string
  form: UseFormReturn<CheckoutFormData>
}) {
  const { control, watch } = form
  const paymentMethod = watch('payment.method')
  const availableMethods: { value: 'cash' | 'card' | 'e-wallet'; label: string }[] = [
    { value: 'cash', label: t('cash') },
    { value: 'card', label: t('card.title') },
    { value: 'e-wallet', label: t('e-wallet.title') },
  ]

  const PaymentMethodIcon = ({ method }: { method: string }) => {
    switch (method) {
      case 'cash':
        return <Image src={'/assets/payment/cash-method.svg'} alt="" width={30} height={30} />
      case 'card':
        return <Image src={'/assets/payment/card-method.svg'} alt="" width={30} height={30} />
      case 'e-wallet':
        return <Image src={'/assets/payment/e-wallet-method.svg'} alt="" width={30} height={30} />
      default:
        return <Image src={'/assets/payment/cash-method.svg'} alt="" width={30} height={30} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t('name')}</h2>
      </div>

      <div>
        <FormLabel>{t('method')}</FormLabel>
        <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {availableMethods.map((method) => (
            <button
              key={method.value}
              type="button"
              onClick={() => form.setValue('payment.method', method.value)}
              className={cn(
                'bg-background flex items-center justify-between rounded-lg p-4 text-xs font-bold transition-colors',
                paymentMethod === method.value
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
                    paymentMethod === method.value ? 'border-card-foreground' : 'border-[#AEAEAE]',
                  )}
                >
                  {paymentMethod === method.value && (
                    <span className="bg-card-foreground flex h-full w-full rounded-full"></span>
                  )}
                </div>
              </span>
            </button>
          ))}
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="payment.cardHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('card.owner')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('card.owner')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="payment.cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('card.number')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="1234 5678 9012 3456" maxLength={19} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="payment.expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('card.date')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="MM/YY" maxLength={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="payment.cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('card.ccv')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123" maxLength={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {paymentMethod === 'e-wallet' && (
        <div className="grid grid-cols-2">
          <FormField
            control={control}
            name="payment.walletPhoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('e-wallet.number')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('e-wallet.number')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default PaymentMethodStep
