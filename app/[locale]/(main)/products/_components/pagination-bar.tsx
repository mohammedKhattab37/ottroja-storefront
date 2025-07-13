'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

interface paginationProps {
  currentPage: number
  totalProducts: number
  itemsPerPage: number
  direction: string
}

const PaginationBar = ({
  currentPage = 1,
  totalProducts = 0,
  itemsPerPage = 12,
  direction = 'ltr',
}: paginationProps) => {
  const t = useTranslations('products.pagination')
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalProducts)

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }
  const pageNumbers = getPageNumbers()

  // Update URL with new params
  const updateUrl = (params: { page?: number; perPage?: number }) => {
    const current = new URLSearchParams(searchParams.toString())
    if (params.page !== undefined) current.set('page', params.page.toString())
    if (params.perPage !== undefined) current.set('per_page', params.perPage.toString())
    router.push(`?${current.toString()}`)
  }

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    updateUrl({ page })
  }

  const onItemsPerPageChange = (perPage: number) => {
    updateUrl({ page: 1, perPage })
  }

  return (
    <div className="mt-20 flex flex-col items-center justify-between gap-4 px-4 py-3 sm:flex-row">
      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2"
        >
          <ChevronLeft className={cn('h-4 w-4', direction == 'rtl' ? 'scale-x-[-1]' : '')} />
          {t('back')}
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) =>
            page === '...' ? (
              <span
                key={index}
                className="text-secondary h-8 gap-1.5 rounded-sm border-[1px] border-[#E9E9E9] bg-white px-2 text-sm"
              >
                ...
              </span>
            ) : (
              <Button
                key={index}
                variant={currentPage === page ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => onPageChange(+page)}
                className={cn(
                  'h-8 min-w-8 rounded-sm px-2',
                  currentPage === page ? 'font-bold' : '',
                )}
              >
                {page}
              </Button>
            ),
          )}
        </div>

        {/* Next page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-sm p-2"
        >
          {t('next')}
          <ChevronRight className={cn('h-4 w-4', direction == 'rtl' ? 'scale-x-[-1]' : '')} />
        </Button>

        <div className="text-muted ms-2 hidden text-xs font-normal md:block">
          {startItem}-{endItem} {t('from')} {totalProducts.toLocaleString()}
        </div>
      </div>

      {/* Items per page selector */}
      <div className="flex items-center gap-2 text-sm font-normal">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
        >
          <SelectTrigger className="h-8 w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="21">21</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-muted">{t('per-page')}</span>
      </div>
    </div>
  )
}

export default PaginationBar
