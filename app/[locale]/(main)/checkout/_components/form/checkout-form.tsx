'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { addressSchema, completeFormSchema, paymentSchema } from '@/zod/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddressStep from './address-step'
import PaymentMethodStep from './payment-method-step'

interface checkoutFormProps {
  t: (key: string) => string
  direction: string
  currentStep: number
  isFirstStep: boolean
  isLastStep: boolean
  next: () => void
  prev: () => void
}

export type CheckoutFormData = z.infer<typeof completeFormSchema>

const CheckoutForm = ({
  t,
  direction,
  currentStep,
  isFirstStep,
  isLastStep,
  next,
  prev,
}: checkoutFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(completeFormSchema),
    defaultValues: {},
    mode: 'onChange',
  })

  const stepSchemas = [addressSchema, paymentSchema]

  const steps = [
    <AddressStep key="address" form={form} t={useTranslations('checkoutPage.step1')} />,
    <PaymentMethodStep key="payment" form={form} t={useTranslations('checkoutPage.step2')} />,
  ]

  const handleNext = async () => {
    const currentStepSchema = stepSchemas[currentStep]
    const currentStepData = form.getValues()

    try {
      await currentStepSchema.parseAsync(
        currentStep == 0 ? currentStepData.address : currentStepData.payment,
      )
      next()
    } catch (error) {
      console.log(error)
      await form.trigger()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      form.reset()
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit = form.handleSubmit(handleSubmit)

  return (
    <div className="bg-filter-trigger text-secondary col-span-1 h-fit rounded-lg p-4 shadow-sm lg:col-span-2">
      <Button
        className="mb-5 flex gap-0 !p-0 text-xs font-medium"
        variant={'vanilla'}
        onClick={prev}
        disabled={isFirstStep}
      >
        {direction == 'rtl' ? (
          <ChevronRight className="size-7 stroke-3" />
        ) : (
          <ChevronLeft className="size-7 stroke-3" />
        )}
        {t('back')}
      </Button>

      <Form {...form}>
        {steps[currentStep]}

        <div className="mt-8 flex justify-center">
          {!isLastStep ? (
            <Button
              variant={'secondary'}
              type="button"
              onClick={handleNext}
              className="rounded-full p-5 px-24 text-xs font-bold"
            >
              {t('next')}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? 'Placing Order...' : t('submit')}
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Form>
    </div>
  )
}

export default CheckoutForm
