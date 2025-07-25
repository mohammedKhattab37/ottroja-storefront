import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Noto_Kufi_Arabic } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import Footer from './_components/footer/Footer'
import HeaderWrapper from './_components/header/HeaderWrapper'
import { RegionProvider } from '@/providers/RegionProvider'

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: '--font-noto-kufi-arabic',
  subsets: ['arabic'],
})

export const metadata: Metadata = {
  title: 'Ottroja Storefront',
  description: 'Ottroja Storefront',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <RegionProvider>
        <NextIntlClientProvider>
          <body className={`${notoKufiArabic.variable} antialiased`}>
            <div className="grid gap-y-16 px-5 md:px-20 xl:px-24 2xl:px-56">
              <HeaderWrapper />
              {children}
              </div>
            <Footer />
          </body>
        </NextIntlClientProvider>
      </RegionProvider>
    </html>
  )
}
