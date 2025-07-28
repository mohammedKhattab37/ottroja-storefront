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
