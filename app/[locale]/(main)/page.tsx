import { getBundles } from './_actions/get-bundles'
import { getCategories } from './_actions/get-categories'
import { getFeaturedProducts } from './_actions/get-featured-products'
import HomePage from './page.client'

export default async function Home() {
  const NavCategories = await getCategories()
  const FeaturedProducts = await getFeaturedProducts()
  const FeaturedBundles = await getBundles()

  return (
    <HomePage
      NavCategories={NavCategories}
      FeaturedProducts={FeaturedProducts}
      FeaturedBundles={FeaturedBundles}
    />
  )
}
