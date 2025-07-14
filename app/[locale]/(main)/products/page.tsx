import { getCategories } from '../_actions/get-categories'
import { getProducts } from './_actions/get-products'
import ProductsPageClient from './page.client'

export interface SearchParams {
  search?: string
  limit?: string
  page?: string
  category?: string
  max?: string
  min?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams
  const productsData = await getProducts({
    page: resolvedSearchParams.page || '1',
    limit: resolvedSearchParams.limit || '12',
    search: resolvedSearchParams.search,
    category: resolvedSearchParams.category,
    min: resolvedSearchParams.min,
    max: resolvedSearchParams.max,
  })
  const categories = await getCategories()

  return (
    <ProductsPageClient
      products={productsData.products}
      totalProducts={productsData.total}
      searchParams={resolvedSearchParams}
      categories={categories}
    />
  )
}
