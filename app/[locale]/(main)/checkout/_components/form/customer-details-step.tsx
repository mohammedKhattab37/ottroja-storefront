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
import { useAuthStore } from '@/stores/auth'
import { useCheckoutStore } from '@/stores/checkout'
import { authStepSchema } from '@/zod/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import z from 'zod'

export type CheckoutCustomerData = z.infer<typeof authStepSchema>

function CustomerDetailsStep({ t }: { t: (key: string) => string }) {
  const { submitAuthForm, next, isSubmitting } = useCheckoutStore()
  const { toggleModal, setAuthModalType } = useAuthStore()

  const form = useForm<CheckoutCustomerData>({
    resolver: zodResolver(authStepSchema),
    defaultValues: {},
    mode: 'onChange',
  })

  const { control, watch } = form
  const customerType = watch('customer_type')
  const availableTypes: {
    value: 'login' | 'register' | 'guest'
    label: string
    onClick?: () => void
  }[] = [
    {
      value: 'login',
      label: t('step1.login'),
      onClick: () => {
        setAuthModalType('login')
        toggleModal()
      },
    },
    {
      value: 'register',
      label: t('step1.register'),
      onClick: () => {
        setAuthModalType('register')
        toggleModal()
      },
    },
    { value: 'guest', label: t('step1.guest.title') },
  ]

  const CustomerTypesIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'login':
        return <Image src={'/assets/payment/cash-method.svg'} alt="" width={30} height={30} />
      case 'register':
        return <Image src={'/assets/payment/card-method.svg'} alt="" width={30} height={30} />
      case 'guest':
        return <Image src={'/assets/payment/e-wallet-method.svg'} alt="" width={30} height={30} />
      default:
        return <Image src={'/assets/payment/cash-method.svg'} alt="" width={30} height={30} />
    }
  }

  const handleNext = async () => {
    try {
      const guestCreated = await submitAuthForm(form.getValues())

      if (guestCreated) next()
    } catch (error) {
      console.log('Validation error:', error)
      form.trigger()
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{t('step1.name')}</h2>
        </div>

        <div>
          <FormLabel>{t('step1.type')}</FormLabel>
          <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {availableTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  if (type.onClick) type.onClick()
                  form.setValue('customer_type', type.value)
                }}
                className={cn(
                  'bg-background flex items-center justify-between rounded-lg p-4 text-xs font-bold transition-colors',
                  customerType === type.value
                    ? 'border-card-foreground text-card-foreground border-2'
                    : 'text-[#AEAEAE]',
                )}
              >
                <CustomerTypesIcon type={type.value} />
                <span className="flex items-center gap-2 text-sm font-medium">
                  {type.label}
                  <div
                    className={cn(
                      'h-[18px] w-[18px] rounded-full border p-0.5',
                      customerType === type.value ? 'border-card-foreground' : 'border-[#AEAEAE]',
                    )}
                  >
                    {customerType === type.value && (
                      <span className="bg-card-foreground flex h-full w-full rounded-full"></span>
                    )}
                  </div>
                </span>
              </button>
            ))}
          </div>
        </div>

        {customerType === 'guest' && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="guest.name"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{t('step1.guest.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('step1.guest.name')} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="guest.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step1.guest.email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('step1.guest.email')}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="guest.phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step1.guest.phone')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('step1.guest.phone')}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
      {customerType == 'guest' && (
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
      )}
    </Form>
  )
}

export default CustomerDetailsStep
