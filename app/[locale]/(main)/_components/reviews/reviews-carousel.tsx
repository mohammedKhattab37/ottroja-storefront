import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { dummyReviews } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'

function ReviewsCarousel({ direction }: { direction: string }) {
  return (
    <div className="w-full max-w-fit">
      <Carousel className="w-full">
        <CarouselContent className="h-72">
          {dummyReviews.map((item, i) => (
            <CarouselItem key={i} dir={direction}>
              <div className="text-secondary grid gap-6 overflow-hidden rounded-lg">
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-fit w-fit rounded-full bg-white p-8"></span>
                  <span className="text-sm font-bold">{item.name}</span>
                </div>
                <div className="grid gap-7">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm font-normal">{item.content}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className={'mt-6 flex items-center justify-center space-x-4'}>
          <CarouselPrevious
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
