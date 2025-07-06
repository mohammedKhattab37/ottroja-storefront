import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

function ReviewsCarousel({ direction }: { direction: string }) {
  const carouselBtnsClasses =
    'bg-secondary text-secondary-foreground border-0  disabled:text-carousel-control-disabled-fg disabled:bg-carousel-control-disabled  disabled:opacity-100 hover:bg-secondary hover:text-secondary-foreground'
  const DummyItems = [
    {
      name: 'Yaser Ahmed',
      title: 'Its a great product',
      content: 'great product with a lot of benefits i love it so much',
    },
    {
      name: 'Yaser Ahmed',
      title: 'Its a great product',
      content: 'great product with a lot of benefits i love it so much',
    },
    {
      name: 'Yaser Ahmed',
      title: 'Its a great product',
      content: 'great product with a lot of benefits i love it so much',
    },
    {
      name: 'Yaser Ahmed',
      title: 'Its a great product',
      content: 'great product with a lot of benefits i love it so much',
    },
  ]

  return (
    <div className="w-full max-w-fit">
      <Carousel className="w-full">
        <CarouselContent className="h-72">
          {DummyItems.map((item, i) => (
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
              carouselBtnsClasses,
            )}
          />

          <CarouselNext
            className={cn(
              'relative top-0 right-0 h-12 w-12 translate-x-0 translate-y-0 rounded-full',
              carouselBtnsClasses,
            )}
          />
        </div>
      </Carousel>
    </div>
  )
}

export default ReviewsCarousel
