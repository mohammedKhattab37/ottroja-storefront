import { cn } from '@/lib/utils'
import Image from 'next/image'

function PhotoGallerySection() {
  const fetchedPhotos = [
    '/assets/large-photo.png',
    '/assets/small-photo.png',
    '/assets/small-photo.png',
    '/assets/large-photo.png',
  ]

  // The sizes to apply to each photo
  const photoSizes = ['col-span-2', 'col-span-1', 'col-span-1', 'col-span-2']
  const insertImages = [
    <div
      className="col-span-1 content-center bg-cover bg-center text-center"
      style={{
        backgroundImage: `url(/assets/gallery-ph1.webp)`,
        backgroundBlendMode: 'overlay',
      }}
      key={'ph1'}
    ></div>,
    <div
      className="col-span-1 bg-cover bg-center"
      style={{
        backgroundImage: `url(/assets/gallery-ph2.webp)`,
        backgroundBlendMode: 'overlay',
      }}
      key={'ph2'}
    ></div>,
  ]

  // Format photos
  const imageData = fetchedPhotos.map((photo, index) => (
    <Image
      key={index}
      alt="photo"
      src={photo}
      width={400}
      height={400}
      className={cn('h-full w-full cursor-pointer', photoSizes[index])}
    />
  ))

  // Insert images at specific positions
  imageData.splice(1, 0, insertImages[0])
  imageData.splice(4, 0, insertImages[1])

  return (
    <div className="overflow-hidden rounded-2xl drop-shadow-md">
      <div className="grid auto-rows-[200px] grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-4">
        {imageData.map((item) => item)}
      </div>
    </div>
  )
}

export default PhotoGallerySection
