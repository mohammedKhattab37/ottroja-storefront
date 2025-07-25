import InputWithIcon from '@/components/input-with-icon'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { importantLinks, infoCenterLinks, paymentIcons, socialsIcons } from '@/lib/constants'
import { dummyContacts } from '@/lib/dummy-data'
import { formatContactsInfo } from '@/lib/fromat-contacts'
import { Send } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Category } from '../../_actions/get-categories'
import FooterServices from './footer-services'

function Footer({ categories }: { categories: Category[] }) {
  const t = useTranslations('homePage.footer')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'

  const footerServices = [...Array(4)].map((_, index) => {
    const service = 'service' + (index + 1)
    return {
      title: t(`services.${service}.title`),
      description: t(`services.${service}.description`),
      image: `/assets/illustrations/footer-services/${service}.svg`,
    }
  })

  return (
    <footer className="bg-secondary text-secondary-foreground" dir={direction}>
      <div className="max-width-container relative py-28">
        <FooterServices services={footerServices} />
        <div className="mt-16 grid grid-cols-3 gap-10 lg:mt-0 xl:grid-cols-7 xl:gap-12">
          <div className="col-span-3 grid gap-4 xl:col-span-2">
            <Link href={'/'}>
              <Image src={'/assets/logo/footer-logo.svg'} width={100} height={100} alt="Ottroja" />
            </Link>
            <p className="text-xs leading-6 font-normal">{t('ottroja-description')}</p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialsIcons.map((icon) => (
                <Link key={icon.name} href={''}>
                  <Image
                    alt={icon.name}
                    src={`/assets/socials/${icon.name}`}
                    width={icon.size}
                    height={icon.size}
                  />
                </Link>
              ))}
            </div>
            {/* contacts info */}
            <div className="pt-5 text-xs font-semibold">
              {formatContactsInfo({
                t,
                contacts: dummyContacts,
              }).map(
                (contact, idx) =>
                  contact && (
                    <span className="flex items-center gap-2 py-1" key={idx}>
                      {contact.icon}
                      <div>
                        <span>{contact.label} :</span>
                        <span> {contact.value}</span>
                      </div>
                    </span>
                  ),
              )}
            </div>
          </div>

          <FooterSection
            title={t('links-groups.categories')}
            items={categories.map((cat) => ({
              name: locale == 'ar' ? cat.nameAr : cat.nameEn,
              url: '/products?category=' + cat.slug,
            }))}
          />
          <FooterSection
            title={t('links-groups.important-links')}
            items={importantLinks.map((link) => ({
              name: locale == 'ar' ? link.name_ar : link.name_en,
              url: link.url,
            }))}
          />
          <FooterSection
            title={t('links-groups.information')}
            items={infoCenterLinks.map((link) => ({
              name: locale == 'ar' ? link.name_ar : link.name_en,
              url: link.url,
            }))}
          />

          <div className="col-span-3 flex flex-col justify-between gap-10 xl:col-span-2">
            <div className="grid gap-10">
              <div>
                <p className="pt-8 pb-4 text-sm font-bold">{t('links-groups.newsletter.name')}</p>
                <p className="top- text-xs leading-6 font-normal">
                  {t('links-groups.newsletter.description')}
                </p>
              </div>
              <InputWithIcon
                name="newsletter"
                type="email"
                classNames="bg-input xl:max-w-full max-w-2/3 border-input-border text-secondary placeholder:text-muted py-5 ps-12"
                direction={direction}
                icon={
                  <Button className="hover:bg-secondary bg-darker -start-1 top-[3px] rounded-md p-1.5">
                    <Send />
                  </Button>
                }
                iconWrapperClasses="top-[3px] -start-1"
                placeholder="email@gmail.com"
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold">{t('links-groups.payment')}</p>
              <div className="flex w-fit gap-2 rounded-md bg-white px-2 py-0">
                {paymentIcons.map((icon) => (
                  <Image
                    key={icon.name}
                    alt={icon.name}
                    src={`/assets/payment/${icon.name}`}
                    width={icon.size}
                    height={icon.size}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-0 w-full bg-[#3B3735] p-4 text-center text-xs font-normal">
        {t('rights')}
      </div>
    </footer>
  )
}

export default Footer

function FooterSection({
  title,
  items,
}: {
  title: string
  items: { name: string; url: string }[]
}) {
  return (
    <div className="grid-cols-1">
      <p className="py-8 text-sm font-bold">{title}</p>
      <div className="grid gap-5 text-xs font-semibold">
        {items.map((item, i) => (
          <Link key={i} href={item.url}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
