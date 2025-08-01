'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import { useLocale, useTranslations } from 'next-intl'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCustomerSession } from '../_auth/_actions/get-session'
import CheckoutItemsSummary from './_components/checkout-items-summary'
import CheckoutForm from './_components/form/checkout-form'
import SubmitResultStep from './_components/form/submit-result-step'
import { ProgressSteps, SkeletonSteps } from './_components/progress-steps'

const CheckoutPageClient = () => {
  const t = useTranslations('checkoutPage')
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(true)
  const [loggedCustomer, setLoggedCustomer] = useState(false)
  const direction = locale == 'ar' ? 'rtl' : 'ltr'
  const { currentStep, setTotalSteps, isLastStep, goTo } = useCheckoutStore()
  const { items } = useCartStore()

  // Only redirect if cart is empty and we're not on the success step
  useEffect(() => {
    if (items.length == 0 && currentStep !== 3) {
      redirect('/')
    }
  }, [items.length, currentStep])

  useEffect(() => {
    setTotalSteps(4)
    const fetchCustomerSession = async () => {
      const response = await getCustomerSession()
      if (response.success) {
        goTo(1)
        setLoggedCustomer(true)
        useCheckoutStore.setState({ customerId: response.customer.profile?.id })
      }
      setIsLoading(false)
    }

    fetchCustomerSession()
  }, [goTo, setTotalSteps])

  return (
    <div className="relative grid grid-cols-1 gap-4 px-4 py-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {isLoading ? (
        <>
          <SkeletonSteps />
          <Skeleton className="bg-filter-trigger col-span-2 h-full w-full" />
        </>
      ) : (
        <>
          <ProgressSteps
            currentStep={currentStep}
            steps={[t('step1.name'), t('step2.name'), t('step3.name'), t('result-step.title')]}
          />
          {isLastStep() ? (
            <SubmitResultStep key={'submit-result'} />
          ) : (
            <CheckoutForm direction={direction} loggedCustomer={loggedCustomer} />
          )}
        </>
      )}
      <CheckoutItemsSummary t={useTranslations('checkoutPage')} />
    </div>
  )
}

export default CheckoutPageClient
