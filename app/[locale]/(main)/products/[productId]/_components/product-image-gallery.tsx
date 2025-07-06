import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export interface imagesData {
  id: string
  alt: string
  src: string
}

const ProductImageGallery = ({ productImages }: { productImages: imagesData[] }) => {
  const [selectedImage, setSelectedImage] = useState(productImages[0])
  const [startIndex, setStartIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const visibleThumbnails = 4

  const handleImageSelect = (image: imagesData) => {
    if (image.id !== selectedImage.id) {
      setIsLoading(true)
      setSelectedImage(image)

      setTimeout(() => setIsLoading(false), 200)
    }
  }

  const scrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const scrollDown = () => {
    if (startIndex < productImages.length - visibleThumbnails) {
      setStartIndex(startIndex + 1)
    }
  }

  const visibleImages = productImages.slice(startIndex, startIndex + visibleThumbnails)

  return (
    <div className="order-1 flex h-[98%] min-h-[400px] w-full items-center gap-1 self-center md:order-2 md:gap-3">
      {/* Main Image */}
      <div className="relative h-[98%] flex-1 overflow-hidden rounded-lg bg-gray-100 contain-size">
        {isLoading && (
          <div className="bg-opacity-70 absolute inset-0 z-10 flex items-center justify-center bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-t-transparent"></div>
          </div>
        )}
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={100}
          height={100}
          className={`h-full w-full rounded object-fill transition-opacity duration-200 ${
            isLoading ? 'opacity-50' : 'opacity-100'
          }`}
        />
      </div>

      {/* Thumbnail Slider */}
      <div className="flex h-full flex-col items-center md:h-[95%]">
        <Button
          onClick={scrollUp}
          variant={'vanilla'}
          size={'sm'}
          disabled={startIndex === 0}
          className={
            'bg-product-gallery-ctrl w-full cursor-pointer justify-items-center rounded-none rounded-t-md text-black'
          }
        >
          <ChevronUp className="size-5" />
        </Button>

        {/* Rest of Images */}
        <div className="flex h-full flex-col gap-3 overflow-hidden">
          {visibleImages.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageSelect(image)}
              className={`relative h-full w-20 cursor-pointer overflow-hidden bg-gray-100 transition-all duration-200 contain-size ${
                selectedImage.id === image.id ? 'opacity-100' : 'opacity-75'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={100}
                height={100}
                className="h-full w-full rounded object-fill"
              />
            </div>
          ))}
        </div>

        <Button
          onClick={scrollDown}
          variant={'vanilla'}
          size={'sm'}
          disabled={startIndex >= productImages.length - visibleThumbnails}
          className={
            'bg-product-gallery-ctrl w-full cursor-pointer justify-items-center rounded-none rounded-b-md text-black'
          }
        >
          <ChevronDown className="size-5" />
        </Button>
      </div>
    </div>
  )
}

export default ProductImageGallery
