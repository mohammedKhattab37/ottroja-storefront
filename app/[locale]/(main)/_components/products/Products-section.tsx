import Header from '@/components/header'
import ProductBigCard from '@/components/product-big-card'
import { useLocale, useTranslations } from 'next-intl'
import { Product } from '../../products/_actions/types'

function ProductsSection({ FeaturedProducts }: { FeaturedProducts: Product[] }) {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const contentDirection = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div>
      <Header title={t('sections.products')} direction={contentDirection} />

      <div className="grid grid-cols-1 gap-x-5 gap-y-28 px-16 pt-40 sm:px-20 md:grid-cols-2 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
        {FeaturedProducts.map((product) => (
          <ProductBigCard
            key={product.id}
            direction={contentDirection}
            data={{
              ...product,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsSection
