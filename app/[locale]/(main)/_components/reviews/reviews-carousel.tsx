import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { dummyReviews } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function ReviewsCarousel({ direction }: { direction: string }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mt-16 w-full max-w-fit">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent className="h-max min-h-96 p-20 lg:p-0">
          {dummyReviews.map((item, i) => (
            <CarouselItem key={i} dir={direction} className="content-center lg:basis-1/2 lg:ps-20">
              <div
                className={cn(
                  'text-secondary border-border bg-card grid scale-120 gap-6 overflow-hidden rounded-lg border p-10 transition-all duration-500',
                  {
                    'scale-100 opacity-60': i !== current - 1,
                  },
                )}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={'/assets/review-avatar.svg'}
                    alt={''}
                    width={20}
                    height={20}
                    className="size-16"
                  />
                  <div>
                    <span className="text-sm font-bold">{item.name}</span>
                    <div className="mt-1 flex items-center gap-1" dir={direction}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          stroke="currentColor"
                          className={cn(
                            'h-4 w-4',
                            i < (item.rating ?? 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-[#E8E8E8] text-[#E8E8E8]',
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid gap-7">
                  <p className="font-bold">{item.title}</p>
                  <p className="line-clamp-2 text-sm font-normal">{item.content}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className={'mt-6 flex items-center justify-center space-x-4'}>
          <CarouselPrevious
            disabled={current - 1 < 0}
            className={cn(
              'relative top-0 left-0 h-12 w-12 translate-x-0 translate-y-0 rounded-full',
            )}
          />

          <CarouselNext
            className={cn(
              'relative top-0 right-0 h-12 w-12 translate-x-0 translate-y-0 rounded-full',
            )}
          />
        </div>
      </Carousel>
    </div>
  )
}

export default ReviewsCarousel
