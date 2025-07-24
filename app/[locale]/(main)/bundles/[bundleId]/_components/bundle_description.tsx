import { Bundle } from '../../../_actions/get-bundles'
import { DescriptionSection } from '../../../products/[productId]/_components/product-tabs-section'

interface ProductSummary {
  name: string
  warnings: string[]
  ingredients: string[]
  benefits: string[]
}

function BundleDescription({
  bundle,
  language,
  t,
}: {
  bundle: Bundle
  language: string
  t: (key: string) => string
}) {
  const productMap = new Map<string, ProductSummary>()
  const direction = language == 'ar' ? 'rtl' : 'ltr'

  bundle.bundleItems.forEach((item) => {
    const { variant } = item
    const { product } = variant

    if (!productMap.has(product.id)) {
      const variants = bundle.bundleItems
        .filter((bundleItem) => bundleItem.variant.product.id === product.id)
        .map((bundleItem) => bundleItem.variant)

      const productName = language === 'en' ? product.name_en : product.name_ar
      const variantNames = variants
        .map((v) => (language === 'en' ? v.variant_name_en : v.variant_name_ar))
        .join(', ')

      productMap.set(product.id, {
        name: `${productName} (${variantNames})`,
        warnings: language === 'en' ? product.warnings_en || [] : product.warnings_ar || [],
        ingredients:
          language === 'en' ? product.ingredients_en || [] : product.ingredients_ar || [],
        benefits: language === 'en' ? product.benefits_en || [] : product.benefits_ar || [],
      })
    }
  })

  const formattedItems = Array.from(productMap.values())

  return (
    <div className="mt-28 grid gap-4">
      <div className="bg-secondary text-secondary-foreground w-fit justify-self-center rounded-lg px-4 py-3 font-bold whitespace-nowrap sm:px-8 md:px-10">
        {t('bundle-details')}
      </div>
      <div className="bg-filter-trigger grid gap-10 rounded-lg px-5 py-10" dir={direction}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-4">
          {formattedItems.map((item) => (
            <DescriptionSection
              key={item.name}
              title={t('description.benefits')}
              content={item.benefits}
            />
          ))}

          <div className="grid gap-10 md:gap-4">
            {formattedItems.map((item) => (
              <DescriptionSection
                key={item.name}
                title={t('description.ingredients')}
                content={item.ingredients}
              />
            ))}

            <div className="rounded-lg bg-[#F2A31914] p-4">
              {formattedItems.map((item) => (
                <DescriptionSection
                  key={item.name}
                  title={t('description.warning')}
                  text_color="text-[#B1750C]"
                  list_indicator="/assets/illustrations/warning-list.svg"
                  content={item.warnings}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BundleDescription
