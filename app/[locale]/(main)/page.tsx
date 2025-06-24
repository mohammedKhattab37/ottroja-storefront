import CategoriesSection from './_components/Categories-section'
import ProductsSection from './_components/Products-section'

export default function Home() {
  return (
    <div className="grid justify-items-center gap-y-32 py-28">
      <CategoriesSection />
      <ProductsSection />
    </div>
  )
}
