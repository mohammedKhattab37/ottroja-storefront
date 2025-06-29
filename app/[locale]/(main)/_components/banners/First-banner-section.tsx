import { useLocale } from 'next-intl'
import Image from 'next/image'
import BannerDescription from './banner-description'

function FirstBannerSection() {
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  const dummyBanner = {
    title: 'Dont miss this Offer',
    sub_title: 'Pure Honey with a special price',
    image: '/assets/banner1.png',
    items: ['Royal Honey', 'Mountain Honey (200 gm)'],
    button_text: 'Get the offer now',
    button_destination: '',
  }

  return (
    <div
      className="bg-card border-border relative rounded-md border-[1px] px-6 py-10 sm:px-20 lg:px-16"
      dir={contentDirection}
    >
      <Image
        alt=""
        src={'/assets/banner1-icon.webp'}
        width={200}
        height={200}
        className="absolute end-0 bottom-0 w-32 xl:w-44"
        style={{ transform: contentDirection == 'ltr' ? 'scaleX(-1)' : undefined }}
      />
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
        {dummyBanner.image && (
          <div className="flex justify-center md:justify-start">
            <Image
              alt="banner"
              src={dummyBanner.image}
              width={750}
              height={750}
              className="h-auto w-full min-w-sm object-contain"
            />
          </div>
        )}
        <BannerDescription
          title={dummyBanner.title}
          sub_title={dummyBanner.sub_title}
          bannerItems={dummyBanner.items}
          button_text={dummyBanner.button_text}
          button_destination={dummyBanner.button_destination}
        />
      </div>
    </div>
  )
}

export default FirstBannerSection
