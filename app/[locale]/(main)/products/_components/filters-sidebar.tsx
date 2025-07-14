import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Category } from '../../_actions/get-categories'

function FiltersSidebar({
  dir,
  categories,
  filtersT,
  filters,
}: {
  dir: string
  categories: Category[]
  filtersT: (key: string) => string
  filters: { category?: string; max?: string; min?: string }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = useLocale()

  const [minPrice, setMinPrice] = useState(filters.min || '')
  const [maxPrice, setMaxPrice] = useState(filters.max || '')
  const selectedCategories = filters.category ? filters.category.split(',') : []

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    let newCategories = [...selectedCategories]

    if (checked) {
      if (!newCategories.includes(categoryName)) {
        newCategories.push(categoryName)
      }
    } else {
      newCategories = newCategories.filter((cat) => cat !== categoryName)
    }

    if (newCategories.length > 0) {
      params.set('category', newCategories.join(','))
    } else {
      params.delete('category')
    }

    router.replace(`?${params.toString()}`)
  }

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const numValue = parseFloat(value)

    if (value === '' || (numValue >= 0 && !isNaN(numValue))) {
      if (type === 'min') {
        setMinPrice(value)
        const currentMax = parseFloat(maxPrice)
        if (value !== '' && maxPrice !== '' && numValue > currentMax) {
          return
        }
      } else {
        setMaxPrice(value)
        const currentMin = parseFloat(minPrice)
        if (value !== '' && minPrice !== '' && numValue < currentMin) {
          return
        }
      }

      if (value && numValue >= 0) {
        params.set(type, value)
      } else {
        params.delete(type)
      }

      router.replace(`?${params.toString()}`)
    }
  }

  return (
    <div className="grid gap-5 p-5 lg:p-0">
      <CollapsibleFilter
        name={filtersT('categories')}
        dir={dir}
        open={selectedCategories.length > 0}
      >
        {categories.map((item, index) => (
          <div className="flex items-center gap-3 px-0.5" key={index}>
            <Checkbox
              id={item.id}
              checked={selectedCategories.includes(item.slug)}
              onCheckedChange={(checked) => handleCategoryChange(item.slug, !!checked)}
            />
            <Label htmlFor={item.id}>{locale == 'ar' ? item.nameAr : item.nameEn}</Label>
          </div>
        ))}
      </CollapsibleFilter>

      <CollapsibleFilter
        name={filtersT('price.name')}
        dir={dir}
        open={!!filters.max || !!filters.min}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Input
              type="number"
              id="min-price"
              min="0"
              placeholder={filtersT('price.min')}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={(e) =>
                e.currentTarget.value && handlePriceChange('min', e.currentTarget.value)
              }
              className="border-input-border text-secondary placeholder:text-muted bg-card [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <span>-</span>
          <div className="flex gap-2">
            <Input
              type="number"
              id="max-price"
              min="0"
              placeholder={filtersT('price.max')}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={(e) =>
                e.currentTarget.value && handlePriceChange('max', e.currentTarget.value)
              }
              className="border-input-border text-secondary placeholder:text-muted bg-card [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </CollapsibleFilter>
    </div>
  )
}

export default FiltersSidebar

function CollapsibleFilter({
  name,
  dir,
  open = false,
  children,
}: {
  name: string
  dir: string
  open: boolean
  children: React.ReactNode
}) {
  return (
    <Collapsible defaultOpen={open} className="group/collapsible">
      <CollapsibleTrigger className="bg-filter-trigger flex w-full cursor-pointer items-center justify-between rounded-sm p-2 text-xs font-semibold">
        {name}{' '}
        <ChevronRight
          className={cn(
            'transition-transform',
            dir == 'rtl'
              ? 'scale-x-[-1] group-data-[state=open]/collapsible:-rotate-90'
              : 'group-data-[state=open]/collapsible:rotate-90',
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="grid gap-5 pt-5">{children}</CollapsibleContent>
    </Collapsible>
  )
}
