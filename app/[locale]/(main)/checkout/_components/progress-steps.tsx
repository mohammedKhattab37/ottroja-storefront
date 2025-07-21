import { Skeleton } from '@/components/ui/skeleton'
import { Check } from 'lucide-react'

export const ProgressSteps = ({ steps, currentStep }: { steps: string[]; currentStep: number }) => {
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

export const SkeletonSteps = () => {
  const skeletonSteps = Array.from({ length: 3 }, (_, index) => index)

  return (
    <div className="-top-28 block w-full justify-self-center px-2 sm:px-0 md:absolute">
      <div className="mb-4 flex w-full items-center justify-between justify-self-center sm:justify-center">
        {skeletonSteps.map((_, index) => (
          <div key={index} className="flex items-center gap-2 text-xs font-bold sm:text-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
            {index < skeletonSteps.length - 1 && (
              <Skeleton className="ms-1 me-3 hidden h-1 w-10 sm:block xl:w-28" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
