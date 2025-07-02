import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { categoriesSlugs } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoriesList(t: (key: string) => string){
  return [...Array(6)].map((_, index) => {
    const cat = 'cat' + (index + 1)
    const slug=  Object.entries(categoriesSlugs).find((catSlug) => catSlug[0] == cat)?.[1] || cat
    return {
      name: t(`list.${cat}`),
      slug:slug,
      image: `/assets/illustrations/categories/${cat}.svg`,
      url:
        'categories/' +slug,
    }
  })
}
