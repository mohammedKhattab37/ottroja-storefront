import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function SubmitResultStep() {
  const t = useTranslations('checkoutPage.result-step')
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000) // Redirect to home after 5 seconds

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="bg-filter-trigger text-secondary col-span-1 h-fit space-y-6 rounded-lg p-4 py-20 text-center shadow-sm lg:col-span-2">
      <div className="flex justify-center">
        <span className="bg-checkout-step-pass h-fit w-fit rounded-full p-4">
          <Check className="size-20 stroke-white stroke-2" />
        </span>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t('title')}</h2>
      </div>
      <span className="text-sm font-normal">{t('sub-title')}</span>
    </div>
  )
}

export default SubmitResultStep
