import Header from '@/components/header'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import BannerDescription from './banner-description'

interface BannerData {
  title: string
  sub_title: string
  image: string
  items: string[]
  button_destination: string
}

function FirstBannerSection({ bundleData }: { bundleData: BannerData }) {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="max-width-container">
      <Header title={t('sections.offers')} direction={contentDirection} />
      <div
        className="bg-card border-border relative mt-20 rounded-md border-[1px] px-6 py-10 sm:px-20 lg:px-16"
        dir={contentDirection}
      >
        <Image
          alt=""
          src={'/assets/illustrations/banner1-icon.svg'}
          width={200}
          height={200}
          className="absolute end-0 bottom-0 w-40 xl:w-52"
          style={{ transform: contentDirection == 'ltr' ? 'scaleX(-1)' : undefined }}
        />
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="flex justify-center md:justify-start lg:h-full">
            <Image
              alt="banner"
              src={bundleData.image || ''}
              width={574}
              height={415}
              className="h-auto w-full min-w-sm object-contain lg:h-full lg:object-cover"
            />
          </div>
          <BannerDescription
            title={bundleData.title}
            sub_title={bundleData.sub_title}
            bannerItems={bundleData.items}
            button_text={t('banners.summer_offer.button_text')}
            button_destination={bundleData.button_destination}
          />
        </div>
      </div>
    </div>
  )
}

export default FirstBannerSection
