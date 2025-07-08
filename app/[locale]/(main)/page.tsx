import { useTranslations } from 'next-intl'
import FirstBannerSection from './_components/banners/First-banner-section'
import SecondBannerSection from './_components/banners/Second-banner-section'
import SubBanners from './_components/banners/Sub-banners'
import CategoriesSection from './_components/categories/Categories-section'
import Hero from './_components/header/hero'
import OffersSection from './_components/products/Offers-section'
import ProductsSection from './_components/products/Products-section'
import ReviewsSection from './_components/reviews/Reviews-section'
import OurJourneySection from './about-us/_components/our-journey-section'

export default function Home() {
  return (
    <div className="grid gap-y-32">
      <Hero />
      <CategoriesSection />
      <ProductsSection />
      <OffersSection />
      <FirstBannerSection />
      <SubBanners />
      <SecondBannerSection />
      <ReviewsSection />
      <OurJourneySection t={useTranslations('ourJourney')} />
    </div>
  )
}
