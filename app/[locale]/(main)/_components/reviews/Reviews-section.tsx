import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import ReviewsCarousel from './reviews-carousel'

function ReviewsSection() {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="grid grid-cols-1 items-center gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
      <div
        className={cn('pt-10', direction == 'ltr' ? 'justify-items-start' : 'justify-items-end')}
      >
        <span
          className="bg-secondary text-secondary-foreground relative p-2 text-xs font-bold"
          dir={direction}
        >
          {t('badges.customer-reviews')}
          <span className="border-t-secondary absolute start-2 -bottom-3 inline-block h-0 w-0 border-t-[15px] border-r-[10px] border-b-0 border-l-[10px] border-solid border-r-transparent border-b-transparent border-l-transparent"></span>
        </span>
        <ReviewsCarousel direction={direction} />
      </div>
      <div
        className={cn(
          'flex justify-center ps-0 lg:justify-start lg:ps-24',
          direction == 'rtl' ? 'order-first lg:order-first' : 'order-first lg:order-last',
        )}
      >
        <Image
          alt="banner"
          src={'/assets/illustrations/reviews-illustration.svg'}
          width={400}
          height={400}
          className="w-2xs object-contain lg:w-sm"
        />
      </div>
    </div>
  )
}

export default ReviewsSection
