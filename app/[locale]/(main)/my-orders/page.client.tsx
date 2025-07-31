'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { Calendar, ChevronDown, ChevronUp, Package, ShoppingBag } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { getCustomerSession } from '../_auth/_actions/get-session'
import type { CustomerUser } from '../_auth/_actions/types'
import { getUserOrders, type Order } from './_actions/get-orders'
import { ReviewModal } from './_components/review-modal'
import { StatusBadge } from './_components/status-badge'

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
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<Order | null>(null)

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

  const formatCurrency = (amount: number) => {
    return locale === 'ar' ? `${amount} جنيه مصري` : `${amount} EGP`
  }

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  const openReviewModal = (order: Order) => {
    setSelectedOrderForReview(order)
    setReviewModalOpen(true)
  }

  const closeReviewModal = () => {
    setReviewModalOpen(false)
    setSelectedOrderForReview(null)
  }

  if (isLoading) {
    return (
      <div className="max-width-container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="mb-6 h-8 w-48 rounded bg-gray-300"></div>
          <div className="space-y-4">
            <div className="h-32 rounded bg-gray-300"></div>
            <div className="h-32 rounded bg-gray-300"></div>
            <div className="h-32 rounded bg-gray-300"></div>
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
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-center text-gray-600">{t('description')}</p>
      </div>

      {isOrdersLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 rounded bg-gray-300"></div>
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
            <Button
              onClick={() => {
                setOrdersError(null)
                setIsOrdersLoading(true)
                fetchOrders()
              }}
            >
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
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {t('orderNumber')}: #{order.orderNumber}
                    </CardTitle>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(order.createdAt).toLocaleDateString(locale)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={order.status} deliveryStatus={order.deliveryStatus} />
                    <span className="text-lg font-semibold">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {order.orderItems.length} {t('items')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      {expandedOrders.has(order.id) ? (
                        <ChevronUp className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                      ) : (
                        <ChevronDown
                          className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}
                        />
                      )}
                      {expandedOrders.has(order.id) ? t('hideDetails') : t('viewDetails')}
                    </Button>
                    {(order.status === 'DELIVERED' || order.deliveryStatus === 'DELIVERED') && (
                      <Button variant="outline" size="sm" onClick={() => openReviewModal(order)}>
                        {t('addReview')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>

              {/* Order Details Expansion */}
              {expandedOrders.has(order.id) && (
                <CardContent className="border-t pt-0">
                  <div className="space-y-4">
                    <h4 className="mb-3 text-lg font-semibold">{t('items')}</h4>
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          {item.productVariant.images?.[0] ? (
                            <Image
                              src={item.productVariant.images[0].url}
                              alt={item.productName}
                              width={80}
                              height={80}
                              className="rounded-md object-cover"
                            />
                          ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gray-200">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <h5 className="mb-1 text-base font-semibold">
                            {(locale === 'ar' || direction === 'rtl') &&
                            item.productVariant.product.name_ar
                              ? item.productVariant.product.name_ar
                              : item.productVariant.product.name_en || item.productName}
                          </h5>
                          <p className="mb-2 text-sm text-gray-600">
                            {(locale === 'ar' || direction === 'rtl') &&
                            item.productVariant.variant_name_ar
                              ? item.productVariant.variant_name_ar
                              : item.productVariant.variant_name_en ||
                                item.productVariant.variant_name_ar}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              <span>
                                {t('quantity')}: {item.quantity}
                              </span>
                              <span className="mx-2">•</span>
                              <span>
                                {formatCurrency(item.unitPrice)} {t('each')}
                              </span>
                            </div>
                            <div className="font-semibold">{formatCurrency(item.totalPrice)}</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Order Summary */}
                    <div className="space-y-2 border-t pt-4">
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
                      <div className="flex justify-between border-t pt-2 text-lg font-semibold">
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

      {/* Review Modal */}
      {selectedOrderForReview && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={closeReviewModal}
          order={selectedOrderForReview}
        />
      )}
    </div>
  )
}
