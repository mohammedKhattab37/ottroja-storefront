'use client'

import { Button } from '@/components/ui/button'
import { useCheckoutStore } from '@/stores/checkout'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import AddressStep from './address-step'
import CustomerDetailsStep from './customer-details-step'
import PaymentMethodStep from './payment-method-step'

interface checkoutFormProps {
  direction: string
  loggedCustomer: boolean
}

const CheckoutForm = ({ direction }: checkoutFormProps) => {
  const t = useTranslations('checkoutPage')
  const { prev, isFirstStep, currentStep } = useCheckoutStore()

  const steps = [
    <CustomerDetailsStep key="customer" t={useTranslations('checkoutPage')} />,
    <AddressStep key="address" t={useTranslations('checkoutPage')} />,
    <PaymentMethodStep key="payment" t={useTranslations('checkoutPage')} />,
  ]

  return (
    <div className="bg-filter-trigger text-secondary col-span-1 h-fit rounded-lg p-4 shadow-sm lg:col-span-2">
      <Button
        className="mb-5 flex gap-0 !p-0 text-xs font-medium"
        variant={'vanilla'}
        onClick={prev}
        disabled={isFirstStep()}
      >
        {direction === 'rtl' ? (
          <ChevronRight className="size-7 stroke-3" />
        ) : (
          <ChevronLeft className="size-7 stroke-3" />
        )}
        {t('back')}
      </Button>

      {steps[currentStep]}
    </div>
  )
}

export default CheckoutForm
