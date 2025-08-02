'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useRouter } from '@/i18n/navigation'
import { useAuthStore } from '@/stores/auth'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { resetPassword } from './_actions/reset-password'

export function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [isPending, setIsPending] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const router = useRouter()
  const t = useTranslations('auth.reset-password')
  const locale = useLocale()
  const direction = locale == 'ar' ? 'rtl' : 'ltr'
  const { setAuthModalType, toggleModal } = useAuthStore()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const password = String(formData.get('password'))
    const confirmPassword = String(formData.get('confirmPassword'))

    if (!password) {
      toast.error(t('errors.password-required'))
      return
    }

    if (password !== confirmPassword) {
      console.log(password)
      console.log(confirmPassword)
      toast.error(t('errors.passwords-dont-match'))
      return
    }

    if (password.length < 6) {
      toast.error(t('errors.password-too-short'))
      return
    }

    if (!token) {
      toast.error(t('errors.invalid-token'))
      return
    }

    setIsPending(true)
    try {
      const response = await resetPassword(password, token)

      if (response.success) {
        setIsReset(true)
        toast.success(t('success'))
        setAuthModalType('login')
        setTimeout(() => {
          router.push('/')
          toggleModal()
        }, 2000)
      } else {
        toast.error(response.error)
      }
    } catch (error) {
      console.log('Password reset Error', error)
      toast.error(t('errors.default-error'))
    } finally {
      setIsPending(false)
    }
  }

  if (!token) {
    return (
      <div className="max-width-container mx-auto mt-10 mb-20 p-4" dir={direction}>
        <Card className="mx-auto max-w-md text-center">
          <CardContent className="py-12">
            <div className="mb-10">
              <h1 className="text-secondary mb-2 text-3xl font-bold">{t('invalid-token')}</h1>
              <p>{t('invalid-token-description')}</p>
            </div>

            <Button asChild className="w-full" variant="secondary">
              <Link href="/auth/forgot-password">{t('request-newLink')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isReset) {
    return (
      <div className="max-width-container mx-auto mt-10 mb-20 p-4" dir={direction}>
        <Card className="mx-auto max-w-md text-center">
          <CardContent className="py-12">
            <div className="mb-10">
              <h1 className="text-secondary mb-2 text-3xl font-bold">{t('success-title')}</h1>
              <p>{t('success-description')}</p>
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
            <h1 className="text-secondary mb-2 text-3xl font-bold">{t('title')}</h1>
            <p>{t('description')}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 pb-10">
              <div className="grid gap-2">
                <Label htmlFor="password">{t('new-password')}</Label>
                <Input
                  id="password"
                  minLength={6}
                  name="password"
                  required
                  type="password"
                  className="bg-filter-trigger border-input-border border"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">{t('confirm-password')}</Label>
                <Input
                  id="confirmPassword"
                  minLength={6}
                  name="confirmPassword"
                  required
                  type="password"
                  className="bg-filter-trigger border-input-border border"
                />
              </div>
              <Button className="w-full" disabled={isPending} type="submit" variant="secondary">
                {isPending ? t('resetting') : t('button')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
