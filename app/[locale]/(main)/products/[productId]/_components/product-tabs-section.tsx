import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ReviewsData } from '../../_actions/types'

interface ProductTabsProps {
  productT: (key: string) => string
  direction: 'ltr' | 'rtl' | undefined
  description: {
    weight_packaging?: string
    benefits?: string[]
    ingredients?: string[]
    warnings?: string[]
  }
  reviews?: ReviewsData
}

function ProductTabsSection({ productT, direction, description, reviews }: ProductTabsProps) {
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
                  <div className="rounded-lg bg-[#F2A31914] p-4">
                    <DescriptionSection
                      title={productT('description.warning')}
                      text_color="text-[#B1750C]"
                      list_indicator="/assets/illustrations/warning-list.svg"
                      content={description.warnings}
                    />
                  </div>
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
            {reviews?.data && reviews.data.length > 0 ? (
              <Carousel
                className="max-w-full"
                opts={{
                  align: 'start',
                  containScroll: 'trimSnaps',
                }}
              >
                <CarouselContent>
                  {reviews.data.map((review) => (
                    <CarouselItem
                      key={review.id}
                      dir={direction}
                      className="basis-full lg:basis-1/2"
                    >
                      <div className="text-secondary bg-card border-input-border grid h-full min-h-64 content-start gap-6 overflow-hidden rounded-md border px-10 py-8 text-sm">
                        <div className="flex items-center gap-4">
                          <Image
                            src={'/assets/product-review-avatar.svg'}
                            alt={''}
                            width={20}
                            height={20}
                            className="size-16"
                          />
                          <div className="grid min-w-0 gap-2">
                            <span className="truncate font-bold">{review.customer.name}</span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <span
                                  key={starIndex}
                                  className={
                                    starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="leading-8">
                          <p className="font-bold">{review.title}</p>
                          <p className="overflow-hidden leading-6 font-normal">{review.content}</p>
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
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">{productT('no-reviews')}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProductTabsSection

export function DescriptionSection({
  title,
  text_color,
  content,
  list_indicator = '/assets/illustrations/list-indicator.svg',
  itemsPerLine = 1,
}: {
  title: string
  text_color?: string
  content: string | string[]
  list_indicator?: string
  itemsPerLine?: number
}) {
  return (
    <div className={text_color ? text_color : ''}>
      <p className="font-bold">{title}</p>
      {Array.isArray(content) ? (
        <ul
          className={`grid list-none gap-4 pt-3 text-xs font-normal lg:grid-cols-${itemsPerLine}`}
        >
          {content.map((item, idx) => (
            <li className="flex items-start gap-2" key={idx}>
              <Image src={list_indicator} alt={''} width={20} height={20} />

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
