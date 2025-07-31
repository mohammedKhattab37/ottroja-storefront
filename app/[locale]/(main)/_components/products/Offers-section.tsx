import Header from '@/components/header'
import ProductSmallCard from '@/components/product-small-card'
import { useLocale, useTranslations } from 'next-intl'
import { DiscountedVariantResponse } from '../../products/_actions/types'

function OffersSection({
  discountedVariants,
}: {
  discountedVariants: DiscountedVariantResponse[]
}) {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="justify-items-center sm:px-0">
      <Header title={t('sections.offers')} direction={contentDirection} />
      <div className="mt-20 grid grid-cols-3 gap-6">
        {discountedVariants.map((variant) => (
          <ProductSmallCard key={variant.id} locale={locale} variant={variant} />
        ))}
      </div>
    </div>
  )
}

export default OffersSection
