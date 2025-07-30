import BannerButton from '@/components/banner-button'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

function WholesaleBanner() {
  const t = useTranslations('homePage.banners.wholesale')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="max-width-container -mt-20">
      <div
        className="bg-card border-border overflow-hidden rounded-md border-[1px] px-6 py-10 sm:px-8 lg:px-16"
        dir={contentDirection}
      >
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="order-first flex justify-center md:order-last md:justify-end">
            <Image
              alt="banner"
              src={'/assets/illustrations/wholesale.svg'}
              width={480}
              height={480}
              className="-my-0 h-auto object-contain pt-0 md:-my-10"
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl leading-normal font-bold sm:text-4xl lg:text-[44px]">
                {t('title')}
                <span className="ms-2 font-normal text-[#EFAC41]">{t('sub_title')}</span>
              </h1>
              <span className="text-secondary text-sm leading-loose font-normal">
                {t('description')}
              </span>
            </div>

            <BannerButton text={t('button_text')} url={'/'} size="sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WholesaleBanner
