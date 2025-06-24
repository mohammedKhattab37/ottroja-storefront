import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { categoriesSlugs } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoriesList(t: (key: string) => string){
  return [...Array(6)].map((_, index) => {
    const cat = 'cat' + (index + 1)
    return {
      name: t(`categories.${cat}`),
      image: `/assets/${cat}.webp`,
      slug:
        'categories/' + Object.entries(categoriesSlugs).find((catSlug) => catSlug[0] == cat)?.[1],
    }
  })
}
