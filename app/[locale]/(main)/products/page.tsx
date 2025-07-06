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
  
  return <ProductsPageClient searchParams={resolvedSearchParams} />
}
