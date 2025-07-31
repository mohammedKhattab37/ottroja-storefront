'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { Order } from '../_actions/get-orders'
import { submitProductReview } from '../_actions/submit-review'

const reviewSchema = z.object({
  productId: z.string().min(1, 'Product selection is required'),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z
    .string()
    .max(1000, 'Review content must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
})

type ReviewFormData = z.infer<typeof reviewSchema>

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  readonly?: boolean
}

function StarRating({ rating, onRatingChange, readonly = false }: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          onClick={() => !readonly && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoveredRating(star)}
          onMouseLeave={() => !readonly && setHoveredRating(0)}
          disabled={readonly}
        >
          <Star
            className={`h-6 w-6 ${
              star <= (hoveredRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order
}

export function ReviewModal({ isOpen, onClose, order }: ReviewModalProps) {
  const t = useTranslations('reviews')
  const locale = useLocale()
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productId: '',
      title: '',
      content: '',
      rating: 0,
    },
  })

  const handleSubmit = async (data: ReviewFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      const result = await submitProductReview({
        orderId: order.id,
        productId: data.productId,
        title: data.title,
        content: data.content,
        rating: data.rating,
      })

      if (result.success) {
        form.reset()
        onClose()
        // You might want to show a success toast here
      } else {
        // Handle error - show error to user
        console.error('Failed to submit review:', result.error)
        setSubmitError(result.error)
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
      setSubmitError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    form.reset()
    setSubmitError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md" dir={direction} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Error Message */}
            {submitError && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}
            {/* Product Selection */}
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('selectProduct')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectProductPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {order.orderItems.map((item) => (
                        <SelectItem key={item.id} value={item.productVariant.productId}>
                          <div className="flex items-center gap-2">
                            <span>
                              {locale === 'ar' && item.productVariant.product.name_ar
                                ? item.productVariant.product.name_ar
                                : item.productVariant.product.name_en || item.productName}
                            </span>
                            <span className="text-sm text-gray-500">
                              (
                              {locale === 'ar' && item.productVariant.variant_name_ar
                                ? item.productVariant.variant_name_ar
                                : item.productVariant.variant_name_en ||
                                  item.productVariant.variant_name_ar}
                              )
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('rating')}</FormLabel>
                  <FormControl>
                    <div>
                      <StarRating rating={field.value} onRatingChange={field.onChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reviewTitle')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('reviewTitlePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reviewContent')}</FormLabel>
                  <FormControl>
                    <textarea
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder={t('reviewContentPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('submitting') : t('submitReview')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
