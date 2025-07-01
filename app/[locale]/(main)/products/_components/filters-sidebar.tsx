import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

function FiltersSidebar({ dir }: { dir: string }) {
  const filters = [
    {
      name: 'Types',
      items: ['Honey', 'Oils', 'Sesame tahini'],
    },
    {
      name: 'Favorites',
      items: ['Honey', 'Oils', 'Sesame tahini'],
    },
    {
      name: 'Other',
      items: ['Honey', 'Oils', 'Sesame tahini'],
    },
  ]

  return (
    <div className="grid gap-5">
      {filters.map((filter, index) => (
        <Collapsible defaultOpen={index === 0} className="group/collapsible" key={filter.name}>
          <CollapsibleTrigger className="bg-filter-trigger flex w-full cursor-pointer items-center justify-between rounded-sm p-2 text-xs font-semibold">
            {filter.name}{' '}
            <ChevronRight
              className={cn(
                'transition-transform',
                dir == 'rtl'
                  ? 'scale-x-[-1] group-data-[state=open]/collapsible:-rotate-90'
                  : 'group-data-[state=open]/collapsible:rotate-90',
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="grid gap-5 pt-5">
            {filter.items.map((item, index) => (
              <div className="flex items-center gap-3 px-0.5" key={index}>
                <Checkbox id={item} />
                <Label htmlFor={item}>{item}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

export default FiltersSidebar
