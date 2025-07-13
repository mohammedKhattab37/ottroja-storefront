import { useState } from 'react'

export const useMultiStepForm = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(0)

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
  const goTo = (step: number) => setCurrentStep(step)

  return {
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    next,
    prev,
    goTo,
    totalSteps,
  }
}
