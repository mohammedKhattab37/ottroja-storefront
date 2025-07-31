'use client'

import { useTranslations } from 'next-intl'

import { dummyBanner } from '@/lib/dummy-data'
import { Bundle } from './_actions/get-bundles'
import type { Category } from './_actions/get-categories'
import FirstBannerSection from './_components/banners/First-banner-section'
import SecondBannerSection from './_components/banners/Second-banner-section'
import SubBanners from './_components/banners/Sub-banners'
import WholesaleBanner from './_components/banners/wholesale-banner'
import CategoriesSection from './_components/categories/Categories-section'
import Hero from './_components/header/hero'
import ProductsSection from './_components/products/Products-section'
import ReviewsSection from './_components/reviews/Reviews-section'
import OurJourneySection from './about-us/_components/our-journey-section'
import { Product } from './products/_actions/types'

export default function HomePage({
  NavCategories,
  FeaturedProducts,
  FeaturedBundles,
}: {
  NavCategories: Category[]
  FeaturedProducts: Product[]
  FeaturedBundles: Bundle[]
}) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-y-24 px-4 md:px-0">
      <Hero />
      <CategoriesSection NavCategories={NavCategories} />
      <ProductsSection FeaturedProducts={FeaturedProducts} />
      <WholesaleBanner />
      {/* <OffersSection /> */}
      <FirstBannerSection bundleData={dummyBanner} />
      <SubBanners />
      <SecondBannerSection />
      <ReviewsSection />
      <OurJourneySection t={useTranslations('ourJourney')} />
    </div>
  )
}
