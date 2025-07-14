import { getProducts } from './_actions/get-products'
import ProductsPageClient from './page.client'

interface SearchParams {
  per_page?: string
  page?: string
  category?: string
  max?: string
  min?: string
  size?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams
  const productsData = await getProducts({
    page: resolvedSearchParams.page || '1',
    limit: resolvedSearchParams.per_page || '12',
  })

  return (
    <ProductsPageClient
      products={productsData.products}
      totalProducts={productsData.total}
      searchParams={resolvedSearchParams}
    />
  )
}
