import Header from '@/components/header'
import { Link } from '@/i18n/navigation'
import { getCategoriesList } from '@/lib/utils'
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

  const categoriesList = getCategoriesList(t)

  return (
    <div className="justify-items-center">
      <Header title={t('sections.categories')} direction={locale == 'ar' ? 'rtl' : 'ltr'} />
      <div
        className="mt-20 flex flex-wrap justify-center gap-16"
        dir={locale == 'ar' ? 'rtl' : 'ltr'}
      >
        {categoriesList.map((category, index) => (
          <CategoryItem
            key={index}
            name={category.name}
            slug={category.url}
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
        <Image alt={name} src={image} width={58} height={58} quality={100} />
        <Image
          alt="border"
          src={'/assets/dashed-border.svg'}
          className="absolute top-2 left-2 -z-10 h-full w-full rounded-full"
          width={60}
          height={60}
          quality={100}
        />
      </div>
      <span className="text-md -mr-2 font-bold">{name}</span>
    </Link>
  )
}
