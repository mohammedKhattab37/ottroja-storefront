import { getCategories } from '../../_actions/get-categories'
import { getProducts } from '../../products/_actions/get-products'
import CategoryPageClient from './page.client'

export interface CategorySearchParams {
  search?: string
  limit?: string
  page?: string
  max?: string
  min?: string
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>
  searchParams: Promise<CategorySearchParams>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  
  // Get all categories to find the current category
  const categories = await getCategories()
  const currentCategory = categories.find(cat => cat.slug === resolvedParams.categorySlug)
  
  // Get products for this specific category
  const productsData = await getProducts({
    page: resolvedSearchParams.page || '1',
    limit: resolvedSearchParams.limit || '12',
    search: resolvedSearchParams.search,
    category: resolvedParams.categorySlug,
    min: resolvedSearchParams.min,
    max: resolvedSearchParams.max,
  })

  return (
    <CategoryPageClient
      products={productsData.products}
      totalProducts={productsData.total}
      searchParams={resolvedSearchParams}
      currentCategory={currentCategory}
    />
  )
}