import Header from '@/components/header'
import { Link } from '@/i18n/navigation'
import { categoriesSlugs } from '@/lib/constants'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

type categoryItem = {
  name: string
  image: string
  slug: string
}

function CategoriesSection() {
  const t = useTranslations('homePage')
  const locale = useLocale()

  const categoriesList: categoryItem[] = [...Array(6)].map((_, index) => {
    const cat = 'cat' + (index + 1)
    return {
      name: t(`categories.${cat}`),
      image: `/assets/${cat}.webp`,
      slug:
        'categories/' + Object.entries(categoriesSlugs).find((catSlug) => catSlug[0] == cat)?.[1],
    }
  })

  return (
    <div className="justify-items-center">
      <Header title={t('sections.categories')} direction={locale == 'ar' ? 'rtl' : 'ltr'} />
      <div
        className="mt-20 flex flex-wrap justify-center gap-20 px-10"
        dir={locale == 'ar' ? 'rtl' : 'ltr'}
      >
        {categoriesList.map((category, index) => (
          <CategoryItem
            key={index}
            name={category.name}
            slug={category.slug}
            image={category.image}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriesSection

function CategoryItem({ name, slug, image }: categoryItem) {
  return (
    <Link href={slug} className="grid gap-y-6 text-center">
      <div className="relative justify-self-center rounded-full bg-[#FEF4CF] px-6 py-5">
        <Image alt={'cat'} src={image} width={60} height={60} />
        <Image
          alt="border"
          src={'/assets/dashed-border.webp'}
          className="absolute top-2 left-2 -z-10 h-full w-full rounded-full"
          width={58}
          height={58}
          quality={100}
          style={{ imageResolution: '300dpi' }}
        />
      </div>
      <span className="text-md -mr-2 font-bold">{name}</span>
    </Link>
  )
}
