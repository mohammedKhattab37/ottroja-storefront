'use client'

import { useMultiStepForm } from '@/hooks/use-multistep-form'
import { Check } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import CheckoutItemsSummary from './checkout-items-summary'
import CheckoutForm from './form/checkout-form'

const CheckoutClient = () => {
  const t = useTranslations('checkoutPage')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'
  const { currentStep, isFirstStep, isLastStep, next, prev } = useMultiStepForm(3)

  return (
    <div className="relative grid grid-cols-1 gap-4 py-6 md:grid-cols-2 lg:grid-cols-3">
      <CheckoutItemsSummary t={useTranslations('checkoutPage')} />
      <ProgressSteps
        currentStep={currentStep}
        steps={[t('step1.name'), t('step2.name'), t('step3.name')]}
      />
      <CheckoutForm
        t={useTranslations('checkoutPage')}
        direction={direction}
        currentStep={currentStep}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        next={next}
        prev={prev}
      />
    </div>
  )
}

export default CheckoutClient

// Progress Steps
const ProgressSteps = ({ steps, currentStep }: { steps: string[]; currentStep: number }) => {
  return (
    <div className="-top-28 block w-full justify-self-center px-2 sm:px-0 md:absolute">
      <div className="mb-4 flex w-full items-center justify-between justify-self-center sm:justify-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2 text-xs font-bold sm:text-sm">
            <div className="flex items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  index < currentStep
                    ? 'bg-checkout-step-pass text-white'
                    : index === currentStep
                      ? 'bg-secondary text-secondary-foreground'
                      : 'border-checkout-step-muted text-checkout-step-muted border'
                }`}
              >
                {index < currentStep ? (
                  <Check className="size-5 stroke-white stroke-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={
                  index < currentStep
                    ? 'text-checkout-step-pass'
                    : index == currentStep
                      ? 'text-secondary'
                      : 'text-checkout-step-muted'
                }
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`ms-1 me-3 hidden h-1 w-10 sm:block xl:w-28 ${index < currentStep ? 'bg-checkout-step-pass' : 'bg-checkout-step-muted'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
