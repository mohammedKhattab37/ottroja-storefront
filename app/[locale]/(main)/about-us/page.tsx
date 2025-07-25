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
    <div className="grid gap-20 md:gap-32" dir={direction}>
      <div className="container-padding">
        <div className="h-full w-full justify-items-center rounded-sm bg-[#F7F1E1] p-16">
          <Image
            src={'/assets/about-us.png'}
            width={1000}
            height={1000}
            alt=""
            className="rounded-sm object-contain"
          />
        </div>
      </div>
      <FounderSection t={t} direction={direction} />
      <WhyChooseUs t={useTranslations('aboutPage.choose-us')} />
      <OurJourneySection t={useTranslations('ourJourney')} />
    </div>
  )
}
