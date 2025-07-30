import Header from '@/components/header'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

import type { Category } from '../../_actions/get-categories'

function CategoriesSection({ NavCategories }: { NavCategories: Category[] }) {
  const t = useTranslations('homePage')
  const locale = useLocale()

  return (
    <div className="justify-items-center">
      <Header title={t('sections.categories')} direction={locale == 'ar' ? 'rtl' : 'ltr'} />
      <div
        className="mt-20 flex flex-wrap justify-center gap-16"
        dir={locale == 'ar' ? 'rtl' : 'ltr'}
      >
        {NavCategories.map((category, index) => (
          <CategoryItem
            key={index}
            slug={category.slug}
            image={category.imageUrl}
            nameEn={category.nameEn}
            nameAr={category.nameAr}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriesSection

function CategoryItem({
  slug,
  image,
  nameEn,
  nameAr,
}: {
  slug: string
  image: string | undefined
  nameEn: string
  nameAr: string
}) {
  const locale = useLocale()
  return (
    <Link href={`/products?category=${slug}`} className="grid gap-y-6 text-center">
      <div className="relative justify-self-center rounded-full bg-[#FEF4CF] px-6 py-5 transition-colors duration-300 hover:bg-[#965A18]">
        <Image
          alt={'Category Image'}
          src={image!}
          width={58}
          height={58}
          quality={100}
          className="aspect-square object-cover"
        />
        <Image
          alt="border"
          src={'/assets/dashed-border.svg'}
          className="absolute top-2 left-2 -z-10 h-full w-full rounded-full"
          width={60}
          height={60}
          quality={100}
        />
      </div>
      {locale == 'ar' ? (
        <span className="text-md -mr-2 font-bold">{nameAr}</span>
      ) : (
        <span className="text-md -mr-2 font-bold">{nameEn}</span>
      )}
    </Link>
  )
}
