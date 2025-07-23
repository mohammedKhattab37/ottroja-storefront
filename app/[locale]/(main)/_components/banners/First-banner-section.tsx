import Header from '@/components/header'
import { dummyBanner } from '@/lib/dummy-data'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import BannerDescription from './banner-description'

function FirstBannerSection() {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="container-padding">
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
              src={dummyBanner.image}
              width={574}
              height={415}
              className="h-auto w-full min-w-sm object-contain lg:h-full lg:object-cover"
            />
          </div>
          <BannerDescription
            title={t('banners.summer_offer.title')}
            sub_title={t('banners.summer_offer.sub_title')}
            bannerItems={t.raw('banners.summer_offer.items')}
            button_text={t('banners.summer_offer.button_text')}
            button_destination={t('banners.summer_offer.button_destination')}
          />
        </div>
      </div>
    </div>
  )
}

export default FirstBannerSection
