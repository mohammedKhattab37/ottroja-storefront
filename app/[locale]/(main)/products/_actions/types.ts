export interface Category {
  id: string
  nameEn: string
  slug: string
}

export interface ProductVariant {
  id: string
  price: number
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
  brief_description_en?: string
  brief_description_ar?: string
  imageUrl?: string
  categoryId?: string
  isFeatured?: boolean
  isActive?: boolean
  rating?: number
  createdAt: string
  updatedAt: string
  category?: Category
  variants: ProductVariant[]
  images: ProductImage[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}
