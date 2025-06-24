'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Link } from '@/i18n/navigation'
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

function Hero({ 
  direction, 
  heroData 
}: { 
  direction: string
  heroData?: HeroItem[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api || !heroData || heroData.length === 0) {
      return
    }

    const validHeroItems = heroData.filter(hero => 
      hero.images && hero.images.length > 0 && hero.images[0]?.split('||')[0]
    )
    
    setCount(validHeroItems.length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api, heroData])

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
          className="absolute top-10 right-20 xl:right-40"
          alt="fl"
          src={'/assets/Hero-icon.webp'}
          width={80}
          height={80}
        />
        <Image
          className="absolute right-[45%] bottom-5 xl:bottom-16"
          alt="fl"
          src={'/assets/Hero-icon.webp'}
          width={55}
          height={55}
        />
        <CarouselContent>
          {heroData && heroData.length > 0 && heroData
            .filter(hero => hero.images && hero.images.length > 0 && hero.images[0]?.split('||')[0])
            .map((hero, index) => {
            const imageSrc = hero.images[0]?.split('||')[0]
            return (
            <CarouselItem key={hero.id || index}>
              <div className="grid min-h-96 grid-cols-1 items-center justify-items-center gap-5 px-24 sm:px-14 md:grid-cols-2 md:gap-20 lg:px-28 xl:px-40">
                {imageSrc && (
                  <Image 
                    alt="hero" 
                    src={imageSrc} 
                    width={600} 
                    height={600}
                    className="max-w-full h-auto object-contain"
                  />
                )}
                <div className="text-secondary grid gap-10" dir={direction}>
                  <div>
                    <p className="text-4xl font-bold sm:text-5xl">{hero.title}</p>
                    <p className="text-regular mt-2 sm:text-lg">
                      {hero.sub_title}
                    </p>
                  </div>
                  <Link
                    href={hero.button_destination}
                    className="bg-secondary text-secondary-foreground justify-self-right w-fit rounded-full px-5 py-3 font-extrabold"
                  >
                    {hero.button_text}
                  </Link>
                </div>
              </div>
            </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      {heroData && heroData.length > 0 && (
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
      )}
    </div>
  )
}

export default Hero
