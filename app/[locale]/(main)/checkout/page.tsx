import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import CheckoutPageClient from './page.client'

export default function CheckoutPage() {
  const t = useTranslations('checkoutPage')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="container-padding" dir={direction}>
      <div className="text-secondary relative justify-items-center rounded-sm bg-[#F7F1E1] p-16 md:pb-48">
        <Image
          src={'/assets/illustrations/checkout/green-star.svg'}
          alt=""
          width={30}
          height={30}
          className="absolute start-1/4 top-1/3"
        />
        <Image
          src={'/assets/illustrations/checkout/yellow-password-star.svg'}
          alt=""
          width={30}
          height={30}
          className="absolute end-1/4 top-1/6 md:end-1/3"
        />
        <p className="text-center text-2xl font-bold">{t('header')}</p>
      </div>
      <div className="pb-28">
        <CheckoutPageClient />
      </div>
    </div>
  )
}
