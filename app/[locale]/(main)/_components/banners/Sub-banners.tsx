import Image from 'next/image'

function SubBanners() {
  const dummyBanners = [
    '/assets/sub-banner.png',
    '/assets/sub-banner.png',
    '/assets/sub-banner.png',
  ]

  return (
    <div className="-mt-20 grid grid-cols-3 gap-5">
      {dummyBanners.map((banner, i) => (
        <Image
          key={i}
          alt={`Sub Banner ${i + 1}`}
          src={banner}
          width={600}
          height={600}
          quality={100}
        />
      ))}
    </div>
  )
}

export default SubBanners
