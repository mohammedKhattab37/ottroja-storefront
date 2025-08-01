import { getCategories } from './_actions/get-categories'
import { getOffers } from './_actions/get-offers'
import { getFeaturedProducts } from './_actions/get-featured-products'
import HomePage from './page.client'

export default async function Home() {
  const NavCategories = await getCategories()
  const FeaturedProducts = await getFeaturedProducts()
  const offerVariants = await getOffers()

  return (
    <HomePage
      NavCategories={NavCategories}
      FeaturedProducts={FeaturedProducts}
      offers={offerVariants}
    />
  )
}
