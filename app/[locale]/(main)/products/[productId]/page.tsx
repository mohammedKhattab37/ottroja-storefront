import { dummyProductPage } from '@/lib/dummy-data'
import { useLocale } from 'next-intl'
import ProductClient from './_components/product-client'

export default function ProductPage() {
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="grid gap-y-32">
      <ProductClient productData={dummyProductPage} direction={direction} />
    </div>
  )
}
