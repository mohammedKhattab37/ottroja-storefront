'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { LogOut, Settings, User, UserRound } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { getCustomerSession } from '../../_auth/_actions/get-session'
import { logoutCustomer } from '../../_auth/_actions/logout-customer'
import type { CustomerUser } from '../../_auth/_actions/types'
import AuthModal from '../../_auth/auth-modal'

interface ProfileProps {
  authT: ReturnType<typeof import('next-intl').useTranslations>
  direction: 'ltr' | 'rtl'
  userButtonText: string
}

export function Profile({ authT, direction, userButtonText }: ProfileProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [customer, setCustomer] = useState<CustomerUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { clearCartItems } = useCartStore()

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

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logoutCustomer()
      setCustomer(null)
      // Delete cart from local storage
      localStorage.removeItem('cart-storage')
      clearCartItems()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="border-secondary h-fit animate-pulse rounded-full border-[1.5px] p-2">
          <UserRound className="size-4" />
        </span>
      </div>
    )
  }

  if (customer) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="hidden text-sm md:block" dir={direction}>
          {userButtonText} <span className="font-bold">{customer.name}</span>
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border-secondary focus:ring-primary h-fit rounded-full border-[1.5px] p-2 transition-colors hover:bg-gray-50 focus:ring-2 focus:outline-none">
              {customer.image ? (
                <Image
                  src={customer.image}
                  alt={customer.name}
                  width={16}
                  height={16}
                  className="size-4 rounded-full object-cover"
                />
              ) : (
                <UserRound className="size-4" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isRTL ? 'start' : 'end'}
            className={cn('w-56', isRTL && 'text-right')}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className={cn('text-sm leading-none font-medium', isRTL && 'text-right')}>
                  {customer.name}
                </p>
                <p
                  className={cn(
                    'text-muted-foreground text-xs leading-none',
                    isRTL && 'text-right',
                  )}
                >
                  {customer.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={cn('cursor-pointer', isRTL && 'flex-row-reverse')}>
              <User className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
              <span>{authT('profile.menu.profile')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className={cn('cursor-pointer', isRTL && 'flex-row-reverse')}>
              <Settings className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
              <span>{authT('profile.menu.settings')}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn(
                'cursor-pointer text-red-600 focus:text-red-600',
                isRTL && 'flex-row-reverse',
              )}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
              <span>
                {isLoggingOut ? authT('profile.menu.logging-out') : authT('profile.menu.logout')}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return <AuthModal t={authT} dir={direction} />
}
