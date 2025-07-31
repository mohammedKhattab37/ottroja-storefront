'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { dummyHeroSlides, dummyMobileHeroSlides } from '@/lib/dummy-data'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// interface HeroItem {
//   id: string
//   title: string
//   sub_title: string
//   button_destination: string
//   button_text: string
//   image: string
// }

function Hero() {
  const router = useRouter()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const heroSlides = isMobile ? dummyMobileHeroSlides : dummyHeroSlides

  const handleSlideClick = (link: string) => {
    if (link) {
      router.push(link)
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!api || !heroSlides || heroSlides.length === 0) {
      return
    }

    const validHeroItems = heroSlides.filter((hero) => hero.image && hero.image.split('||')[0])

    setCount(validHeroItems.length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api, heroSlides])

  return (
    <div className="max-width-container relative rounded-sm py-6 drop-shadow-sm">
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
        className={`bg-filter-trigger relative mx-auto ${isMobile ? 'w-[390px]' : 'w-full'}`}
      >
        <CarouselContent className={isMobile ? 'h-[400px]' : 'h-auto'}>
          {heroSlides &&
            heroSlides.length > 0 &&
            heroSlides.map((hero, index) => {
              return (
                <CarouselItem key={hero.id || index}>
                  <div 
                    className="h-full w-full cursor-pointer" 
                    onClick={() => handleSlideClick(hero.link)}
                  >
                    <Image
                      alt="hero"
                      src={hero.image}
                      width={isMobile ? 390 : 1920}
                      height={isMobile ? 400 : 600}
                      className="rounded-[5px] object-cover w-full h-full"
                    />
                  </div>
                </CarouselItem>
              )
            })}
        </CarouselContent>
        {heroSlides && heroSlides.length > 0 && count > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 cursor-pointer rounded-full bg-white shadow-md transition-all duration-300 hover:scale-110 ${
                  index + 1 === current ? 'scale-110' : 'opacity-60'
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  )
}

export default Hero
