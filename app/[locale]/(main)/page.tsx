import FirstBannerSection from './_components/banners/First-banner-section'
import SecondBannerSection from './_components/banners/Second-banner-section'
import SubBanners from './_components/banners/Sub-banners'
import CategoriesSection from './_components/categories/Categories-section'
import PhotoGallerySection from './_components/photo-gallery/Photo-gallery-section'
import OffersSection from './_components/products/Offers-section'
import ProductsSection from './_components/products/Products-section'
import ReviewsSection from './_components/reviews/Reviews-section'

export default function Home() {
  return (
    <div className="grid gap-y-32 px-5 py-28 md:px-20 lg:px-32 xl:px-24 2xl:px-56">
      <CategoriesSection />
      <ProductsSection />
      <OffersSection />
      <FirstBannerSection />
      <SubBanners />
      <PhotoGallerySection />
      <SecondBannerSection />
      <ReviewsSection />
    </div>
  )
}
