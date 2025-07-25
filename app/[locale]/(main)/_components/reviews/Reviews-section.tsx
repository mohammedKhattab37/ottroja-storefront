import Header from '@/components/header'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import ReviewsCarousel from './reviews-carousel'

function ReviewsSection() {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="justify-items-center overflow-x-hidden">
      <Header title={t('badges.customer-reviews')} direction={locale == 'ar' ? 'rtl' : 'ltr'} />
      <ReviewsCarousel direction={direction} />
      <div className="mt-20 w-full">
        <Image
          src={'/assets/illustrations/reviews-footer.svg'}
          alt={''}
          width={20}
          height={20}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default ReviewsSection
