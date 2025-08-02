'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { sendResetToEmail } from './_actions/send-reset-to-email'

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgot-password')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'

  const [isPending, setIsPending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const email = String(formData.get('email-for-reset'))
    if (!email) {
      toast.error(t('errors.email-required'))
      return
    }

    setIsPending(true)
    try {
      const response = await sendResetToEmail(email)

      if (response.success) {
        setEmailSent(true)
        toast.success(t('success'))
      } else {
        toast.error(response.error)
      }
    } catch (error) {
      console.log('Forgot Password Error', error)
      toast.error(t('errors.default-error'))
    } finally {
      setIsPending(false)
    }
  }

  if (emailSent) {
    return (
      <div className="max-width-container mx-auto mt-10 mb-20 p-4" dir={direction}>
        <Card className="mx-auto max-w-md text-center">
          <CardContent className="py-12">
            <div className="mb-10">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('check-email')}</h1>
              <p className="text-gray-600">{t('check-email-description')}</p>
            </div>

            <p className="mb-2 text-start text-sm text-gray-600">{t('didnt-receive-email')}</p>

            <div className="flex gap-4">
              <Button className="flex-1" onClick={() => setEmailSent(false)} variant="outline">
                {t('tryAgain')}
              </Button>
              <Button asChild className="flex-1" variant="secondary">
                <Link href="/">{t('backToLogin')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-width-container mx-auto mt-10 mb-20 p-4" dir={direction}>
      <Card className="mx-auto max-w-md text-center">
        <CardContent className="py-12">
          <div className="mb-16">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-gray-600">{t('description')}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 pb-10">
              <Label htmlFor="email-for-reset">{t('email')}</Label>
              <Input
                id="email-for-reset"
                name="email-for-reset"
                placeholder="example@ex.com"
                type="email"
                required
                className="bg-filter-trigger border-input-border border"
              />
            </div>
            <Button type="submit" variant={'secondary'}>
              {isPending ? t('sending') : t('button')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
