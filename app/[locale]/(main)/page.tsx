import { getCategories } from './_actions/get-categories'
import { getDiscountedVariants } from './_actions/get-discounted-variants'
import { getFeaturedProducts } from './_actions/get-featured-products'
import HomePage from './page.client'

export default async function Home() {
  const NavCategories = await getCategories()
  const FeaturedProducts = await getFeaturedProducts()
  const variantsWithDiscounts = await getDiscountedVariants()

  return (
    <HomePage
      NavCategories={NavCategories}
      FeaturedProducts={FeaturedProducts}
      discountedVariants={variantsWithDiscounts}
    />
  )
}
