import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import HeaderWrapper from './_components/HeaderWrapper'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      <NextIntlClientProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <HeaderWrapper />
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
