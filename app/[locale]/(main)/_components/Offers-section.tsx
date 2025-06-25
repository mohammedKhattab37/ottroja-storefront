import BannerButton from '@/components/banner-button'
import Header from '@/components/header'
import ProductSmallCard from '@/components/product-small-card'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

function OffersSection() {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  const dummyProduct = {
    name: 'Royal Honey',
    image: '/assets/product-card.png',
    url: '#',
    old_price: 300,
    new_price: 190,
    discount: 10,
    currency: 'SAR',
    rating: 4,
  }

  const dummyOfferCard = {
    name: 'Sweeten your day',
    title: 'With the honey offer !',
    sub_title: 'Get natural and pure honey with a special price.',
    image: '/assets/bee-icon.webp',
    button_text: 'Shop Now',
    button_destination: '',
  }

  return (
    <div className="justify-items-center px-1 sm:px-0">
      <Header title={t('sections.offers')} direction={contentDirection} />
      <div className="mt-20 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="grid gap-6">
          <ProductSmallCard direction={contentDirection} product={dummyProduct} />
          <ProductSmallCard direction={contentDirection} product={dummyProduct} />
          <ProductSmallCard direction={contentDirection} product={dummyProduct} />
        </div>
        <div
          className="bg-card border-car border-border relative h-full w-full overflow-hidden rounded-md border-[1px] p-8 pb-72"
          dir={contentDirection}
        >
          <Image
            className="absolute start-0 end-0 -top-5 z-[-1]"
            alt=""
            src={'/assets/bg-bee-hive.webp'}
            width={600}
            height={600}
          />
          <div className="flex justify-center">
            <Image
              className="absolute bottom-0"
              alt={''}
              src={'/assets/hero.png'}
              width={300}
              height={300}
            />
          </div>
          <div className="text-secondary space-y-6" dir={contentDirection}>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Image
                  alt="Bee"
                  src={'/assets/bee-icon.webp'}
                  width={70}
                  height={70}
                  quality={100}
                  style={{ transform: contentDirection == 'rtl' ? 'scaleX(-1)' : undefined }}
                />
                <span className="text-2xl font-semibold">{dummyOfferCard.name}</span>
              </div>
              <h1 className="text-2xl leading-tight font-bold sm:text-3xl">
                {dummyOfferCard.title}
              </h1>
              <p className="text-secondary/80 max-w-3/4 text-base leading-relaxed">
                {dummyOfferCard.sub_title}
              </p>
            </div>
            <BannerButton
              text={dummyOfferCard.button_text}
              url={dummyOfferCard.button_destination}
              size="sm"
            />
          </div>
        </div>
        <div className="grid gap-y-6">
          <ProductSmallCard direction={contentDirection} product={dummyProduct} />
          <ProductSmallCard direction={contentDirection} product={dummyProduct} />
          <ProductSmallCard direction={contentDirection} product={dummyProduct} />
        </div>{' '}
      </div>
    </div>
  )
}

export default OffersSection
