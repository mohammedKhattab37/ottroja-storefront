import CategoriesSection from './_components/Categories-section'
import OffersSection from './_components/Offers-section'
import ProductsSection from './_components/Products-section'

export default function Home() {
  return (
    <div className="3xl:px-64 grid gap-y-32 px-4 py-28 md:px-20 lg:px-32 xl:px-24 2xl:px-56">
      <CategoriesSection />
      <ProductsSection />
      <OffersSection />
    </div>
  )
}
