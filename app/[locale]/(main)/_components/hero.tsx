'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Link } from '@/i18n/navigation'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function Hero({ direction }: { direction: string }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="bg-hero relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5500,
          }),
        ]}
        className="mx-auto w-full"
      >
        <Image
          className="absolute top-10 right-40"
          alt="fl"
          src={'/assets/Hero-icon.webp'}
          width={80}
          height={80}
        />
        <Image
          className="absolute right-[45%] bottom-16"
          alt="fl"
          src={'/assets/Hero-icon.webp'}
          width={55}
          height={55}
        />
        <CarouselContent>
          {[...Array(6)].map((_, index) => (
            <CarouselItem key={index}>
              <div className="grid min-h-96 grid-cols-1 items-center justify-items-center gap-5 px-24 sm:px-14 md:grid-cols-2 md:gap-20 lg:px-32 xl:px-40">
                <Image alt="hero" src={'/assets/hero.png'} width={600} height={600} />
                <div className="text-secondary grid gap-10" dir={direction}>
                  <div>
                    <p className="mb-1 text-4xl font-light sm:text-5xl">Taste the Authenticity</p>
                    <p className="text-4xl font-bold sm:text-5xl">Natural Honey Suitable for you</p>
                    <p className="text-regular mt-2 sm:text-lg">
                      Our products isnt just honey, its an experience.
                    </p>
                  </div>
                  <Link
                    href={'#'}
                    className="bg-secondary text-secondary-foreground justify-self-right w-fit rounded-full px-5 py-3 font-extrabold"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center space-x-2 py-8">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 hover:scale-110 ${
              index + 1 === current ? 'scale-110 bg-[#362416]' : 'bg-secondary-foreground'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
