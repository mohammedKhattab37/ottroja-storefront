'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/i18n/navigation'
import { ShoppingBag, Package, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { getCustomerSession } from '../_auth/_actions/get-session'
import type { CustomerUser } from '../_auth/_actions/types'
import { getUserOrders, type Order } from './_actions/get-orders'

export default function MyOrdersPage() {
  const t = useTranslations('orders')
  const locale = useLocale()
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const [customer, setCustomer] = useState<CustomerUser | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOrdersLoading, setIsOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState<string | null>(null)
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())

  const fetchOrders = useCallback(async () => {
    try {
      const ordersResult = await getUserOrders()
      if (ordersResult.success) {
        setOrders(ordersResult.orders)
        setOrdersError(null)
      } else {
        console.error('Failed to fetch orders:', ordersResult.error)
        setOrders([])
        setOrdersError(ordersResult.error)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      setOrders([])
      setOrdersError('Failed to fetch orders')
    } finally {
      setIsOrdersLoading(false)
    }
  }, [])

  const checkSession = useCallback(async () => {
    try {
      const session = await getCustomerSession()
      if (session.success) {
        setCustomer(session.customer)
        fetchOrders()
      } else {
        setCustomer(null)
      }
    } catch (error) {
      console.error('Failed to get session:', error)
      setCustomer(null)
    } finally {
      setIsLoading(false)
    }
  }, [fetchOrders])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const getStatusBadgeVariant = (status: Order['status']) => {
    const normalizedStatus = status.toLowerCase()
    switch (normalizedStatus) {
      case 'delivered':
        return 'default'
      case 'shipped':
        return 'secondary'
      case 'processing':
        return 'outline'
      case 'pending':
        return 'outline'
      case 'cancelled':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const formatCurrency = (amount: number) => {
    return locale === 'ar' ? `${amount} جنيه مصري` : `${amount} EGP`
  }

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  if (isLoading) {
    return (
      <div className="max-width-container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
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
          <p className="mb-4 text-gray-600">Please log in to view your orders.</p>
          <Button asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-width-container mx-auto mb-20 px-4 py-8" dir={direction}>
      <div className="mb-6">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          {t('title')}
        </h1>
        <p className="text-center text-gray-600">
          {t('description')}
        </p>
      </div>

      {isOrdersLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : ordersError ? (
        <Card className="mx-auto max-w-2xl text-center">
          <CardContent className="py-12">
            <div className="mb-4 text-red-500">
              <ShoppingBag className="mx-auto h-16 w-16" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-red-600">Error Loading Orders</h3>
            <p className="mb-6 text-gray-600">{ordersError}</p>
            <Button onClick={() => {
              setOrdersError(null)
              setIsOrdersLoading(true)
              fetchOrders()
            }}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : orders.length === 0 ? (
        <Card className="mx-auto max-w-2xl text-center">
          <CardContent className="py-12">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold">{t('noOrders')}</h3>
            <p className="mb-6 text-gray-600">{t('noOrdersDescription')}</p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">
                      {t('orderNumber')}: #{order.orderNumber}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(order.createdAt).toLocaleDateString(locale)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {t(`statuses.${order.status.toLowerCase()}`)}
                    </Badge>
                    <span className="font-semibold text-lg">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {order.orderItems.length} {t('items')}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    {expandedOrders.has(order.id) ? (
                      <ChevronUp className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    ) : (
                      <ChevronDown className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    )}
                    {expandedOrders.has(order.id) ? t('hideDetails') : t('viewDetails')}
                  </Button>
                </div>
              </CardContent>
              
              {/* Order Details Expansion */}
              {expandedOrders.has(order.id) && (
                <CardContent className="pt-0 border-t">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg mb-3">{t('items')}</h4>
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          {item.productVariant.images?.[0] ? (
                            <Image
                              src={item.productVariant.images[0].url}
                              alt={item.productName}
                              width={80}
                              height={80}
                              className="object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-grow">
                          <h5 className="font-semibold text-base mb-1">
                            {item.productName}
                          </h5>
                          <p className="text-sm text-gray-600 mb-2">
                            {(locale === 'ar' || direction === 'rtl') && item.productVariant.variant_name_ar 
                              ? item.productVariant.variant_name_ar 
                              : item.productVariant.variant_name_en || item.productVariant.variant_name_ar}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              <span>{t('quantity')}: {item.quantity}</span>
                              <span className="mx-2">•</span>
                              <span>{formatCurrency(item.unitPrice)} {t('each')}</span>
                            </div>
                            <div className="font-semibold">
                              {formatCurrency(item.totalPrice)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Order Summary */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{t('subtotal')}:</span>
                        <span>{formatCurrency(order.subTotal)}</span>
                      </div>
                      {order.shippingAmount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>{t('shipping')}:</span>
                          <span>{formatCurrency(order.shippingAmount)}</span>
                        </div>
                      )}
                      {order.discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>{t('discount')}:</span>
                          <span>-{formatCurrency(order.discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>{t('totalLabel')}:</span>
                        <span>{formatCurrency(order.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}