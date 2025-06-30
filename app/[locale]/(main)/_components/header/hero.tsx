'use client'
import BannerButton from '@/components/banner-button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeroItem {
  id: string
  title: string
  sub_title: string
  button_destination: string
  button_text: string
  images: string[]
}

function Hero({ direction, heroData }: { direction: string; heroData?: HeroItem[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api || !heroData || heroData.length === 0) {
      return
    }

    const validHeroItems = heroData.filter(
      (hero) => hero.images && hero.images.length > 0 && hero.images[0]?.split('||')[0],
    )

    setCount(validHeroItems.length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api, heroData])

  return (
    <div className="bg-hero border-header-border relative mt-6 rounded-sm border-[1px] py-8">
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
          className="absolute top-6 right-10 xl:top-10 xl:right-20"
          alt="fl"
          src={'/assets/Hero-icon.webp'}
          width={80}
          height={80}
        />
        <Image
          className="absolute right-[45%] bottom-2 xl:bottom-20"
          alt="fl"
          src={'/assets/Hero-icon.webp'}
          width={50}
          height={50}
        />
        <CarouselContent>
          {heroData &&
            heroData.length > 0 &&
            heroData
              .filter(
                (hero) => hero.images && hero.images.length > 0 && hero.images[0]?.split('||')[0],
              )
              .map((hero, index) => {
                const imageSrc = hero.images[0]?.split('||')[0]
                return (
                  <CarouselItem key={hero.id || index} dir={direction == 'rtl' ? 'ltr' : 'rtl'}>
                    <div className="container mx-auto px-6 sm:px-8 lg:px-16">
                      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
                        {imageSrc && (
                          <div className="flex justify-center md:justify-start">
                            <div className="flex h-[500px] w-[500px] items-center justify-center bg-transparent">
                              <Image
                                alt="hero"
                                src={imageSrc}
                                width={400}
                                height={400}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          </div>
                        )}
                        <div className="text-secondary space-y-6" dir={direction}>
                          <div className="space-y-3">
                            <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                              {hero.title}
                            </h1>
                            <p className="text-secondary/80 text-base leading-relaxed sm:text-lg">
                              {hero.sub_title}
                            </p>
                          </div>
                          <BannerButton text={hero.button_text} url={hero.button_destination} />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
        </CarouselContent>
      </Carousel>

      {heroData && heroData.length > 0 && count > 1 && (
        <div className="flex justify-center space-x-2 pt-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`bg-darker h-3 w-3 cursor-pointer rounded-full transition-all duration-300 hover:scale-110 ${
                index + 1 === current ? 'scale-110' : 'opacity-20'
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Hero
