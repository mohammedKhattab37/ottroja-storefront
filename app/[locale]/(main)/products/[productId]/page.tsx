import { getProduct } from '../_actions/get-product'
import { getProducts } from '../_actions/get-products'
import ProductPageClient from './page.client'

interface ProductPageProps {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ variant_id?: string }>
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { productId } = await params
  const productData = await getProduct(productId)
  const similarProducts = await getProducts({ limit: '6', category: productData.category?.slug })

  return (
    <div className="max-width-container grid gap-y-32">
      <ProductPageClient
        productData={productData}
        similarProducts={similarProducts.products}
        chosenVariant={(await searchParams).variant_id}
      />
    </div>
  )
}
