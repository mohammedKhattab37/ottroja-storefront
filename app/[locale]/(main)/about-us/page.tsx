import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import FounderSection from './_components/founder-section'
import OurJourneySection from './_components/our-journey-section'
import WhyChooseUs from './_components/why-choose-us'

export default function AboutUsPage() {
  const t = useTranslations('aboutPage')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div
      className="flex flex-col items-center justify-center px-4 md:gap-32 md:px-0"
      dir={direction}
    >
      <Image
        src={'/assets/about-us.png'}
        width={1240}
        height={412}
        alt=""
        className="rounded-sm object-contain"
      />
      <FounderSection t={t} direction={direction} />
      <WhyChooseUs t={useTranslations('aboutPage.choose-us')} />
      <OurJourneySection t={useTranslations('ourJourney')} />
    </div>
  )
}
