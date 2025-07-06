import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DummyReviews } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ProductTabsProps {
  productT: (key: string) => string
  direction: 'ltr' | 'rtl' | undefined
  description: {
    weight_packaging: string
    benefits: string[]
    ingredients: string[]
    warnings: string[]
  }
}

function ProductTabsSection({ productT, direction, description }: ProductTabsProps) {
  return (
    <div className="overflow-hidden pt-20 md:pt-32">
      <Tabs defaultValue="details" className="text-secondary w-full">
        <div className="w-full overflow-x-auto">
          <TabsList
            className="bg-filter-trigger mx-auto mb-5 grid h-full w-fit min-w-fit grid-cols-2 self-center rounded-lg p-1 text-xs"
            dir={direction}
          >
            <TabsTrigger
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground cursor-pointer rounded-lg px-4 py-3 whitespace-nowrap data-[state=active]:font-bold sm:px-8 md:px-10"
              value="details"
            >
              {productT('tabs.details')}
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground cursor-pointer rounded-lg px-4 py-3 whitespace-nowrap data-[state=active]:font-bold sm:px-8 md:px-10"
              value="reviews"
            >
              {productT('tabs.reviews')}
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Product details */}
        <TabsContent
          value="details"
          className="bg-filter-trigger rounded-lg px-5 py-10"
          dir={direction}
        >
          <div className="grid gap-10">
            {description.weight_packaging && (
              <DescriptionSection
                title={productT('description.weight')}
                content={description.weight_packaging}
              />
            )}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-4">
              {description.benefits && (
                <DescriptionSection
                  title={productT('description.benefits')}
                  content={description.benefits}
                />
              )}
              <div className="grid gap-10 md:gap-4">
                {description.ingredients && (
                  <DescriptionSection
                    title={productT('description.ingredients')}
                    itemsPerLine={2}
                    content={description.ingredients}
                  />
                )}
                {description.warnings && (
                  <DescriptionSection
                    title={productT('description.warning')}
                    content={description.warnings}
                  />
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Product reviews */}
        <TabsContent
          value="reviews"
          className="bg-filter-trigger overflow-hidden rounded-lg px-5 py-10"
        >
          <div className="w-full">
            <Carousel
              className="max-w-full"
              opts={{
                align: 'start',
                containScroll: 'trimSnaps',
              }}
            >
              <CarouselContent>
                {DummyReviews.map((item, i) => (
                  <CarouselItem key={i} dir={direction} className="basis-full lg:basis-1/2">
                    <div className="text-secondary bg-card border-input-border grid h-full min-h-64 gap-6 overflow-hidden rounded-md rounded-tl-[5rem] rounded-br-[5rem] border px-10 pt-5 pb-8 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-black p-8"></div>
                        <div className="grid min-w-0 gap-2">
                          <span className="truncate font-bold">{item.name}</span>
                          <span className="truncate text-[10px]">{item.name}</span>
                        </div>
                      </div>
                      <div className="leading-8">
                        <p className="font-bold">{item.title}</p>
                        <p className="overflow-hidden leading-6 font-normal">{item.content}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className={'mt-6 flex items-center justify-center space-x-4'}>
                <CarouselPrevious
                  className={cn(
                    'disabled:border-secondary relative top-0 left-0 h-12 w-12 translate-x-0 translate-y-0 rounded-full disabled:border',
                  )}
                />

                <CarouselNext
                  className={cn(
                    'disabled:border-secondary relative top-0 right-0 h-12 w-12 translate-x-0 translate-y-0 rounded-full disabled:border',
                  )}
                />
              </div>
            </Carousel>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProductTabsSection

function DescriptionSection({
  title,
  content,
  itemsPerLine = 1,
}: {
  title: string
  content: string | string[]
  itemsPerLine?: number
}) {
  return (
    <div>
      <p className="font-bold">{title}</p>
      {Array.isArray(content) ? (
        <ul
          className={`grid list-none gap-4 pt-3 text-xs font-normal lg:grid-cols-${itemsPerLine}`}
        >
          {content.map((item, idx) => (
            <li className="flex items-start gap-2" key={idx}>
              <Image
                src={'/assets/illustrations/list-indicator.svg'}
                alt={''}
                width={20}
                height={20}
              />
              <span className="leading-6">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-xs leading-6 font-normal">{content}</span>
      )}
    </div>
  )
}
