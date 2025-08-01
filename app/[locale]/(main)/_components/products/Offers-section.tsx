import Header from '@/components/header'
import ProductSmallCard from '@/components/product-small-card'
import { useLocale, useTranslations } from 'next-intl'
import { OfferResponse } from '../../products/_actions/types'

function OffersSection({ offers }: { offers: OfferResponse[] }) {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="justify-items-center sm:px-0">
      <Header title={t('sections.offers')} direction={contentDirection} />
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <ProductSmallCard key={offer.id} locale={locale} variant={offer.productVariant} />
        ))}
      </div>
    </div>
  )
}

export default OffersSection
