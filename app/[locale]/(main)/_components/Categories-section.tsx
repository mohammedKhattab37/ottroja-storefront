import Header from '@/components/header'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

function CategoriesSection() {
  const t = useTranslations('homePage')
  const locale = useLocale()

  return (
    <div className="justify-items-center">
      <Header title={t('sections.categories')} direction={locale == 'ar' ? 'rtl' : 'ltr'} />
      <div
        className="mt-20 flex flex-wrap justify-center gap-20 px-10"
        dir={locale == 'ar' ? 'rtl' : 'ltr'}
      >
        {[...Array(6)].map((_, index) => (
          <CategoryItem key={index} name="Honey" href="#" image="/assets/honey-r-cat.webp" />
        ))}
      </div>
    </div>
  )
}

export default CategoriesSection

function CategoryItem({ name, href, image }: { name: string; href: string; image: string }) {
  return (
    <Link href={href} className="grid gap-y-6 text-center">
      <div className="relative rounded-full bg-[#FEF4CF] px-6 py-5">
        <Image alt={'cat'} src={image} width={58} height={58} />
        <Image
          alt="border"
          src={'/assets/dashed-border.webp'}
          className="absolute top-2 left-2 -z-10 h-full w-full rounded-full"
          width={58}
          height={58}
        />
      </div>
      <span className="-mr-2 text-sm font-bold">{name}</span>
    </Link>
  )
}
