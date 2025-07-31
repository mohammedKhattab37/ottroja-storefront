'use client'

import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import type { Order } from '../_actions/get-orders'

interface StatusBadgeProps {
  status: Order['status']
  deliveryStatus?: Order['deliveryStatus']
  className?: string
}

export function StatusBadge({ status, deliveryStatus, className }: StatusBadgeProps) {
  const t = useTranslations('orders')

  const getStatusInfo = (statusType: 'order' | 'delivery', statusValue: string) => {
    const statusKey = statusValue.toLowerCase()

    // Color mapping for better visual hierarchy
    const colorMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', bgColor: string, textColor: string }> = {
      // Order statuses
      'pending': { variant: 'outline', bgColor: 'bg-amber-50', textColor: 'text-amber-700 border-amber-200' },
      'processing': { variant: 'secondary', bgColor: 'bg-blue-50', textColor: 'text-blue-700 border-blue-200' },
      'shipped': { variant: 'default', bgColor: 'bg-purple-50', textColor: 'text-purple-700 border-purple-200' },
      'delivered': { variant: 'default', bgColor: 'bg-green-50', textColor: 'text-green-700 border-green-200' },
      'cancelled': { variant: 'destructive', bgColor: 'bg-red-50', textColor: 'text-red-700 border-red-200' },
      'confirmed': { variant: 'default', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700 border-emerald-200' },
      
      // Delivery statuses (more specific)
      'order_placed': { variant: 'outline', bgColor: 'bg-slate-50', textColor: 'text-slate-700 border-slate-200' },
      'preparing': { variant: 'secondary', bgColor: 'bg-orange-50', textColor: 'text-orange-700 border-orange-200' },
      'out_for_delivery': { variant: 'default', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700 border-indigo-200' },
      'delivery_failed': { variant: 'destructive', bgColor: 'bg-red-50', textColor: 'text-red-700 border-red-200' },
      'returned': { variant: 'outline', bgColor: 'bg-gray-50', textColor: 'text-gray-600 border-gray-300' },
    }

    const config = colorMap[statusKey] || { variant: 'outline' as const, bgColor: 'bg-gray-50', textColor: 'text-gray-700 border-gray-200' }
    
    // Get translation key
    const translationKey = statusType === 'delivery' 
      ? `deliveryStatuses.${statusKey}`
      : `statuses.${statusKey}`

    return {
      ...config,
      label: t(translationKey)
    }
  }

  const orderStatusInfo = getStatusInfo('order', status)
  const deliveryStatusInfo = deliveryStatus ? getStatusInfo('delivery', deliveryStatus) : null

  // Show both statuses if delivery status is available and different from order status
  if (deliveryStatus && deliveryStatus.toLowerCase() !== status.toLowerCase()) {
    return (
      <div className={`flex flex-wrap gap-2 ${className || ''}`}>
        <Badge 
          variant={orderStatusInfo.variant}
          className={`${orderStatusInfo.bgColor} ${orderStatusInfo.textColor} font-medium px-3 py-1.5 text-xs whitespace-nowrap min-w-fit`}
        >
          {orderStatusInfo.label}
        </Badge>
        <Badge 
          variant={deliveryStatusInfo!.variant}
          className={`${deliveryStatusInfo!.bgColor} ${deliveryStatusInfo!.textColor} font-medium px-4 py-1.5 text-sm whitespace-nowrap min-w-fit`}
        >
          {deliveryStatusInfo!.label}
        </Badge>
      </div>
    )
  }

  // Show only primary status (delivery status takes priority if available)
  const primaryStatus = deliveryStatusInfo || orderStatusInfo
  return (
    <Badge 
      variant={primaryStatus.variant}
      className={`${primaryStatus.bgColor} ${primaryStatus.textColor} font-medium px-4 py-1.5 text-sm whitespace-nowrap min-w-fit ${className || ''}`}
    >
      {primaryStatus.label}
    </Badge>
  )
}