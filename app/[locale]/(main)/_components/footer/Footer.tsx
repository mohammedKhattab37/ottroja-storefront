import InputWithIcon from '@/components/input-with-icon'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { paymentIcons, socialsIcons } from '@/lib/constants'
import { formatContactsInfo } from '@/lib/fromat-contacts'
import { getCategoriesList } from '@/lib/utils'
import { Send } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import FooterServices from './footer-services'

function Footer() {
  const t = useTranslations('homePage')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'
  const allCategories = getCategoriesList(t)

  const dummyFooterServices = [
    {
      title: 'Free Shipping',
      description: 'On all orders over $50',
    },
    {
      title: 'Easy Returns',
      description: '30 days return policy',
    },
    {
      title: 'Secure Payment',
      description: '100% secure payment',
    },
    {
      title: 'Customer Support',
      description: '24/7 customer support',
    },
  ]

  const dummyContacts = [
    { title: 'address', value: '123 Main St, City' },
    { title: 'mail', value: 'info@example.com' },
    { title: 'phone', value: '+123456789' },
  ]

  const dummyImportantLinks = [
    { name: 'address', url: '123 Main St, City' },
    { name: 'mail', url: 'info@example.com' },
    { name: 'phone', url: '+123456789' },
  ]

  return (
    <footer className="bg-secondary text-secondary-foreground" dir={direction}>
      <div className="relative mt-36 px-5 py-28 md:px-20 lg:px-32 xl:px-24 2xl:px-44">
        <FooterServices services={dummyFooterServices} />
        <div className="grid grid-cols-3 gap-10 xl:grid-cols-7 xl:gap-12">
          <div className="col-span-3 grid gap-4 xl:col-span-2">
            <Link href={'/'}>
              <Image src={'/assets/logo/footer-logo.svg'} width={100} height={100} alt="Ottroja" />
            </Link>
            <p className="text-xs leading-6 font-normal">{t('footer.ottroja-description')}</p>
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

          <FooterSection title={t('footer.links-groups.categories')} items={allCategories} />
          <FooterSection
            title={t('footer.links-groups.important-links')}
            items={dummyImportantLinks}
          />
          <FooterSection title={t('footer.links-groups.information')} items={dummyImportantLinks} />

          <div className="col-span-3 flex flex-col justify-between gap-10 xl:col-span-2">
            <div className="grid gap-10">
              <div>
                <p className="pt-8 pb-4 text-sm font-bold">
                  {t('footer.links-groups.newsletter.name')}
                </p>
                <p className="top- text-xs leading-6 font-normal">
                  {t('footer.links-groups.newsletter.description')}
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
              <p className="mb-2 text-xs font-semibold">{t('footer.links-groups.payment')}</p>
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
        {t('footer.rights')}
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
