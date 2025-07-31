import { getCategories } from './_actions/get-categories'
import { getFeaturedProducts } from './_actions/get-featured-products'
import HomePage from './page.client'

export default async function Home() {
  const NavCategories = await getCategories()
  const FeaturedProducts = await getFeaturedProducts()

  return (
    <HomePage
      NavCategories={NavCategories}
      FeaturedProducts={FeaturedProducts}
    />
  )
}
