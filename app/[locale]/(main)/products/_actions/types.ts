export interface Category {
  id: string
  nameEn: string
  slug: string
  nameAr?: string
}

export interface ProductVariant {
  id: string
  price: number
  variant_name_en?: string
  variant_name_ar?: string
  compare_at_price?: number | null
  images: ProductImage[]
  inventory?: { quantityAvailable: number }
}

export interface ProductImage {
  id: string
  url: string
  isMain: boolean
}

export interface ReviewCustomer {
  name: string
}

export interface Review {
  id: string
  rating: number
  title: string
  content: string
  createdAt: string
  customer: ReviewCustomer
}

export interface ReviewPagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ReviewsData {
  data: Review[]
  pagination: ReviewPagination
}

export interface ReviewStats {
  averageRating: number
  totalReviews: number
}

export interface Product {
  id: string
  name_en: string
  name_ar: string
  slug: string
  description_en?: string
  description_ar?: string
  brief_title_en?: string
  brief_title_ar?: string
  brief_text_en?: string
  brief_text_ar?: string
  warnings_en?: string[]
  warnings_ar?: string[]
  benefits_en?: string[]
  benefits_ar?: string[]
  ingredients_en?: string[]
  ingredients_ar?: string[]
  imageUrl?: string
  categoryId?: string
  isFeatured?: boolean
  isActive?: boolean
  rating?: number
  reviewStats?: ReviewStats
  reviews?: ReviewsData
  createdAt: string
  updatedAt: string
  category?: Category
  variants: ProductVariant[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface DiscountedVariantResponse extends ProductVariant {
  product: {
    name_en: string
    name_ar: string
    slug: string
  }
}

export interface OfferResponse {
  id: string
  productVariant: DiscountedVariantResponse
}

export interface OffersApiResponse {
  offers: OfferResponse[]
  total: number
}
