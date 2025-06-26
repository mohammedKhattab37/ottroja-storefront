import CategoriesSection from './_components/Categories-section'
import FirstBannerSection from './_components/First-banner-section'
import OffersSection from './_components/Offers-section'
import ProductsSection from './_components/Products-section'
import SecondBannerSection from './_components/Second-banner-section'
import SubBanners from './_components/Sub-banners'

export default function Home() {
  return (
    <div className="grid gap-y-32 px-5 py-28 md:px-20 lg:px-32 xl:px-24 2xl:px-56">
      <CategoriesSection />
      <ProductsSection />
      <OffersSection />
      <FirstBannerSection />
      <SubBanners />
      <SecondBannerSection />
    </div>
  )
}
