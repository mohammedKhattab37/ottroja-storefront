import { getProduct } from '../_actions/get-product'
import { getProducts } from '../_actions/get-products'
import ProductPageClient from './page.client'

interface ProductPageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params
  const productData = await getProduct(productId)
  const similarProducts = await getProducts({ limit: '6', category: productData.category?.slug })

  return (
    <div className="grid gap-y-32">
      <ProductPageClient productData={productData} similarProducts={similarProducts.products} />
    </div>
  )
}
