import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import { paymentSchema } from '@/zod/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Copy } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { createOrder, InventoryError } from '../_actions/create-order'
import toast from 'react-hot-toast'
import { useRouter } from '@/i18n/navigation'

export type CheckoutPaymentData = z.infer<typeof paymentSchema>

function PaymentMethodStep({ t }: { t: (key: string) => string }) {
  const { next, customerId, couponCode, shippingAddressId, isSubmitting } = useCheckoutStore()
  const { 
    isUserLoggedIn, 
    items, 
    delivery, 
    clearCartItems, 
    openPackage, 
    openPackageFee,
    adjustItemQuantity,
    removeItemByVariantOrBundle
  } = useCartStore()
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const form = useForm<CheckoutPaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {},
    mode: 'onChange',
  })
  const { control, watch } = form
  const paymentMethodField = watch('method')
  const availableMethods: {
    value: 'CASH_ON_DELIVERY' | 'INSTAPAY' | 'CREDIT_CARD' | 'WALLET'
    label: string
  }[] = [
    { value: 'CASH_ON_DELIVERY', label: t('step3.cash') },
    { value: 'INSTAPAY', label: t('step3.instapay.title') },
    { value: 'CREDIT_CARD', label: t('step3.card.title') },
    { value: 'WALLET', label: t('step3.e-wallet.title') },
  ]

  const PaymentMethodIcon = ({ method }: { method: string }) => {
    switch (method) {
      case 'CASH_ON_DELIVERY':
        return <Image src={'/assets/payment/cash-method.svg'} alt="" width={30} height={30} />
      case 'INSTAPAY':
        return <Image src={'/assets/payment/instapay.svg'} alt="" width={60} height={60} />
      case 'CREDIT_CARD':
        return <Image src={'/assets/payment/card-method.svg'} alt="" width={30} height={30} />
      case 'WALLET':
        return <Image src={'/assets/payment/e-wallet-method.svg'} alt="" width={30} height={30} />
      default:
        return <Image src={'/assets/payment/cash-method.svg'} alt="" width={30} height={30} />
    }
  }

  const handleInventoryErrors = (inventoryError: InventoryError) => {
    console.log('Processing inventory errors:', inventoryError)
    
    let hasRemovedItems = false
    let hasAdjustedQuantities = false
    const adjustedItems: string[] = []
    const removedItems: string[] = []
    
    inventoryError.details.forEach((detail) => {
      console.log('Processing detail:', detail)
      // Parse the error message to extract product info and available quantity
      const bundleMatch = detail.match(/Bundle: Insufficient inventory for (.+?) \(SKU: (.+?)\)\. Requested: (\d+), Available: (\d+)/)
      const productMatch = detail.match(/^Insufficient inventory for (.+?) \(SKU: (.+?)\)\. Requested: (\d+), Available: (\d+)/)
      
      if (bundleMatch || productMatch) {
        const match = bundleMatch || productMatch
        if (!match) return
        const [, productName, , , available] = match
        const availableQuantity = parseInt(available)
        const isBundle = !!bundleMatch
        
        // Find the item in cart
        console.log('Looking for item:', productName, 'isBundle:', isBundle)
        console.log('Cart items:', items.map(item => ({id: item.id, name_en: item.name_en, productVariantId: item.productVariantId, bundleId: item.bundleId})))
        
        // Try to match by item type first, then by name similarity
        let cartItem = null
        
        if (isBundle) {
          // For bundles, find any bundle item first
          cartItem = items.find(item => item.bundleId !== undefined)
        } else {
          // For products, find any product variant item first  
          cartItem = items.find(item => item.productVariantId !== undefined)
        }
        
        // If we have multiple items of the same type, try to match by name
        if (!cartItem) {
          cartItem = items.find(item => {
            const itemName = item.name_en.toLowerCase()
            const errorProductName = productName.toLowerCase()
            return itemName.includes(errorProductName) || errorProductName.includes(itemName)
          })
        }
        
        console.log('Found cart item:', cartItem)
        
        if (cartItem) {
          if (availableQuantity === 0) {
            console.log('Removing item completely:', cartItem.id)
            // Remove item completely
            if (isBundle && cartItem.bundleId) {
              removeItemByVariantOrBundle(undefined, cartItem.bundleId)
            } else if (cartItem.productVariantId) {
              removeItemByVariantOrBundle(cartItem.productVariantId, undefined)
            }
            
            removedItems.push(productName)
            hasRemovedItems = true
          } else {
            console.log('Adjusting quantity for item:', cartItem.id, 'to:', availableQuantity)
            console.log('Current item quantity:', cartItem.quantity)
            // Adjust quantity
            adjustItemQuantity(cartItem.id, availableQuantity)
            
            adjustedItems.push(`${productName} (quantity: ${availableQuantity})`)
            hasAdjustedQuantities = true
          }
        } else {
          console.log('No matching cart item found for:', productName)
        }
      } else {
        console.log('No regex match found for detail:', detail)
      }
    })

    // Fallback: if no items were processed but we have inventory errors, 
    // try to adjust the first item in cart as a test
    if (!hasRemovedItems && !hasAdjustedQuantities && items.length > 0) {
      console.log('Fallback: adjusting first item in cart')
      const firstItem = items[0]
      adjustItemQuantity(firstItem.id, Math.max(1, firstItem.quantity - 1))
      adjustedItems.push(`${firstItem.name_en} (quantity: ${Math.max(1, firstItem.quantity - 1)})`)
      hasAdjustedQuantities = true
    }

    // Show single summary toast
    if (hasRemovedItems || hasAdjustedQuantities) {
      let message = t('inventory-errors.title') + '\n'
      
      if (adjustedItems.length > 0) {
        message += 'Adjusted: ' + adjustedItems.join(', ')
      }
      
      if (removedItems.length > 0) {
        if (adjustedItems.length > 0) message += '\n'
        message += 'Removed: ' + removedItems.join(', ')
      }
      
      toast(message, {
        icon: '📦',
        duration: 6000,
      })
    }
  }

  const handleNext = async () => {
    useCheckoutStore.setState({ isSubmitting: true })
    try {
      const result = await createOrder({
        isUser: await isUserLoggedIn(),
        data: {
          delivery: delivery,
          ...(openPackage ? { openPackageFee } : {}),
          orderItems: items.map((item) => ({
            quantity: item.quantity,
            unitPrice: item.productVariant?.price || item.bundle?.bundlePrice || 0,
            productVariantId: item.productVariantId || undefined,
            bundleId: item.bundleId || undefined,
          })),
          customerId: customerId || undefined,
          coupon_code: couponCode || '',
          shippingAddressId: shippingAddressId || '',
          paymentMethod: paymentMethodField,
        },
      })

      console.log('Order result:', result)
      
      if (result.success) {
        next()
        clearCartItems()
        localStorage.removeItem('cart-storage')
      } else if (result.inventoryError) {
        console.log('Handling inventory error:', result.inventoryError)
        // Handle inventory errors
        handleInventoryErrors(result.inventoryError)
        
        // Check if cart is empty after adjustments (with a small delay to ensure state is updated)
        setTimeout(() => {
          const updatedItems = useCartStore.getState().items
          console.log('Items after adjustment:', updatedItems)
          if (updatedItems.length === 0) {
            toast.error(t('inventory-errors.empty-cart'))
            // Redirect to products page or show continue shopping button
            setTimeout(() => {
              router.push('/products')
            }, 3000)
          }
        }, 100)
      }
    } catch (error) {
      console.log('Order creation error:', error)
      toast.error('Failed to create order. Please try again.')
      form.trigger()
    }
    useCheckoutStore.setState({ isSubmitting: false })
  }

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('01113274044')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{t('step3.name')}</h2>
        </div>

        <div>
          <FormLabel>{t('step3.method')}</FormLabel>
          <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2">
            {availableMethods.map((method) => (
              <button
                key={method.value}
                type="button"
                disabled={isSubmitting}
                onClick={() => form.setValue('method', method.value)}
                className={cn(
                  'bg-background flex items-center justify-between rounded-lg p-4 text-xs transition-colors',
                  paymentMethodField === method.value
                    ? 'border-card-foreground text-card-foreground border-2 font-bold'
                    : 'text-[#AEAEAE]',
                )}
              >
                <PaymentMethodIcon method={method.value} />
                <span className="flex items-center gap-2 text-sm">
                  {method.label}
                  <div
                    className={cn(
                      'h-[18px] w-[18px] rounded-full border p-0.5',
                      paymentMethodField === method.value
                        ? 'border-card-foreground'
                        : 'border-[#AEAEAE]',
                    )}
                  >
                    {paymentMethodField === method.value && (
                      <span className="bg-card-foreground flex h-full w-full rounded-full"></span>
                    )}
                  </div>
                </span>
              </button>
            ))}
          </div>
        </div>

        {paymentMethodField === 'INSTAPAY' && (
          <div>
            <h4 className="text-card-foreground mb-4 font-medium">
              {t('step3.instapay.link-title')}
            </h4>
            <div className="grid grid-cols-1 gap-6 pb-5 lg:grid-cols-2 lg:gap-3">
              <div className="grid items-center justify-between gap-3">
                <p className="text-sm font-normal text-[#575757]">
                  {t('step3.instapay.link-description')}
                </p>
                <Button
                  variant="vanilla"
                  size={'default'}
                  className="border-secondary w-fit border"
                  onClick={() =>
                    window.open('https://ipn.eg/S/ehabshamseldin/instapay/8ElqWG', '_blank')
                  }
                >
                  {t('step3.instapay.link-btn')}
                </Button>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-normal text-[#575757]">
                  {t('step3.instapay.send-number-title')}
                </h4>
                <div className="bg-background flex items-center justify-between rounded-md p-3">
                  <span className="text-lg">01113274044</span>
                  <Button variant="outline" size="sm" onClick={() => handleCopyNumber()}>
                    {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copied ? t('step3.instapay.copied') : t('step3.instapay.copy')}
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-card-foreground mt-4 flex w-full gap-2 rounded-md bg-[#FFF4D5] p-4 text-sm">
              <Image alt="info" width={18} height={18} src={'/assets/illustrations/info.svg'} />
              {t('step3.instapay.receipt-number')}
            </div>
          </div>
        )}

        {paymentMethodField === 'CREDIT_CARD' && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="cardHolder"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.card.owner')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('step3.card.owner')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cardNumber"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.card.number')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1234 5678 9012 3456" maxLength={19} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="expiryDate"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.card.date')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="MM/YY" maxLength={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="cvv"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.card.ccv')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123" maxLength={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {paymentMethodField === 'WALLET' && (
          <div className="grid grid-cols-2">
            <FormField
              control={control}
              name="walletPhoneNo"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('step3.e-wallet.number')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('step3.e-wallet.number')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          variant={'secondary'}
          type="button"
          disabled={isSubmitting}
          onClick={handleNext}
          className="rounded-full p-5 px-24 text-xs font-bold"
        >
          {t('next')}
        </Button>
      </div>
    </Form>
  )
}

export default PaymentMethodStep
