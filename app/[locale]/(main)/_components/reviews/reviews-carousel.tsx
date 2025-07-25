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
    <div className="mt-16 flex h-[400px] w-screen max-w-full items-center overflow-x-hidden">
      <Carousel
        setApi={setApi}
        className="w-full max-w-full"
        opts={{
          align: 'center',
          loop: true,
          slidesToScroll: 1,
          dragFree: true,
        }}
      >
        <CarouselContent className="flex h-full items-center">
          {dummyReviews.map((item, i) => (
            <CarouselItem
              key={i}
              dir={direction}
              className="flex flex-shrink-0 basis-full md:basis-1/3 justify-center"
            >
              <div
                className={cn(
                  'text-secondary border-border bg-card grid overflow-hidden transition-all duration-500',
                  {
                    // Side reviews - responsive sizing
                    'h-[270px] w-[300px] md:w-[575px] rounded-[10px] border-[1px] opacity-50': i !== current - 1,
                    // Center review - responsive sizing
                    'h-[311px] w-[330px] md:w-[661px] scale-100 rounded-[11.5px] border-[1.15px] opacity-100':
                      i === current - 1,
                  },
                )}
                style={
                  i === current - 1
                    ? {
                        gap: '11.5px',
                        paddingTop: '39.12px',
                        paddingRight: '40.27px',
                        paddingBottom: '39.12px',
                        paddingLeft: '40.27px',
                      }
                    : {
                        gap: '10px',
                        paddingTop: '34px',
                        paddingRight: '35px',
                        paddingBottom: '34px',
                        paddingLeft: '35px',
                      }
                }
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
                <div className="flex flex-col items-start">
                  <p className="mb-[20px] font-bold">{item.title}</p>
                  <p className="text-sm font-normal line-clamp-4 md:line-clamp-none">{item.content}</p>
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
