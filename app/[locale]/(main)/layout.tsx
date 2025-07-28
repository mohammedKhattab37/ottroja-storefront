import { ToasterProvider } from '@/components/providers/toast-provider'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Noto_Kufi_Arabic } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { getCategories } from './_actions/get-categories'
import Footer from './_components/footer/Footer'
import Header from './_components/header/Header'

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
  const categories = await getCategories()

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body className={`${notoKufiArabic.variable} antialiased`}>
          <Header />
          {children}
          <Footer categories={categories} />
          <ToasterProvider />
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
