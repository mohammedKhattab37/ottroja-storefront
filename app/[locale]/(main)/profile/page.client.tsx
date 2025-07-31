'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Mail, User } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { getCustomerSession } from '../_auth/_actions/get-session'
import type { CustomerUser } from '../_auth/_actions/types'

export default function ProfilePage() {
  const t = useTranslations('profile')
  const locale = useLocale()
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const [customer, setCustomer] = useState<CustomerUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkSession = useCallback(async () => {
    try {
      const session = await getCustomerSession()
      if (session.success) {
        setCustomer(session.customer)
      } else {
        setCustomer(null)
      }
    } catch (error) {
      console.error('Failed to get session:', error)
      setCustomer(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (isLoading) {
    return (
      <div className="max-width-container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-6 h-8 w-48 rounded bg-gray-300"></div>
          <div className="space-y-4">
            <div className="h-32 rounded bg-gray-300"></div>
            <div className="h-24 rounded bg-gray-300"></div>
            <div className="h-24 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="max-width-container mx-auto mb-20 px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
          <p className="mb-4 text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-width-container mx-auto mb-20 px-4 py-8" dir={direction}>
      <div className="mb-6">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          {t('title', { fallback: 'Profile' })}
        </h1>
        <p className="text-center text-gray-600">
          {t('description', { fallback: 'Manage your account information and preferences' })}
        </p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader className="pb-6 text-center">
          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
            {customer.image ? (
              <Image
                src={customer.image}
                alt={customer.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <CardTitle className="mb-2 text-2xl">{customer.name}</CardTitle>
          <CardDescription className="flex items-center justify-center gap-2 text-base">
            <Mail className="h-4 w-4" />
            {customer.email}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">{t('name')}</label>
              <p className="text-lg">{customer.name}</p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">{t('email')}</label>
              <p className="text-lg">{customer.email}</p>
            </div>

            {customer.phone && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-500">{t('phone')}</label>
                <p className="text-lg">{customer.phone}</p>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-500">
                {t('memberSince')}
              </label>
              <p className="text-lg">
                {customer.created_at
                  ? new Date(customer.created_at).toLocaleDateString(locale)
                  : 'N/A'}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <Button variant="outline" className="w-full">
              <Edit className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {t('editProfile')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
