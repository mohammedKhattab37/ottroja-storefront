import { dummyBanner2 } from '@/lib/dummy-data'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import BannerDescription from './banner-description'

function SecondBannerSection() {
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div
      className="bg-card border-border relative overflow-hidden rounded-md border-[1px] px-6 py-10 sm:px-8 lg:px-16"
      dir={contentDirection}
    >
      <Image
        alt=""
        src={'/assets/illustrations/banner2-icon.svg'}
        width={150}
        height={150}
        className="absolute end-0 bottom-0 w-20 scale-x-[-1] md:start-0 md:scale-x-[1] xl:w-36"
        style={{ transform: contentDirection == 'ltr' ? 'scaleX(-1)' : undefined }}
      />
      <Image
        alt="Bee"
        src={'/assets/illustrations/bee.svg'}
        width={90}
        height={90}
        quality={100}
        className="absolute start-0 top-4 hidden w-24 md:block xl:top-16"
        style={{ transform: contentDirection == 'rtl' ? 'scaleX(-1)' : undefined }}
      />
      <Image
        alt="Bee"
        src={'/assets/illustrations/bee.svg'}
        width={70}
        height={70}
        quality={100}
        className="absolute end-0 top-3/4 block md:end-[45%] md:top-1/2 md:hidden lg:block"
        style={{ transform: contentDirection == 'ltr' ? 'scaleX(-1)' : undefined }}
      />
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
        {dummyBanner2.image && (
          <div className="order-first flex justify-center md:order-last md:justify-end">
            <Image
              alt="banner"
              src={dummyBanner2.image}
              width={750}
              height={750}
              className="-mx-6 -my-0 h-auto w-full min-w-sm object-contain pt-0 md:-mx-8 md:-my-10 md:pt-10 lg:-mx-16"
            />
          </div>
        )}
        <BannerDescription
          title={dummyBanner2.title}
          sub_title={dummyBanner2.sub_title}
          button_text={dummyBanner2.button_text}
          button_destination={dummyBanner2.button_destination}
        />
      </div>
    </div>
  )
}

export default SecondBannerSection
