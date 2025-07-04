import { Link } from '@/i18n/navigation'
import Image from 'next/image'

function SubBanners() {
  const dummyBanners = [
    {
      image: '/assets/sub-banner.png',
      url: '/',
    },
    {
      image: '/assets/sub-banner.png',
      url: '/',
    },
    {
      image: '/assets/sub-banner.png',
      url: '/',
    },
  ]

  return (
    <div className="-mt-20 grid grid-cols-3 gap-5">
      {dummyBanners.map((banner, i) => (
        <Link key={i} href={banner.url}>
          <Image
            alt={`Sub Banner ${i + 1}`}
            src={banner.image}
            width={600}
            height={600}
            quality={100}
          />
        </Link>
      ))}
    </div>
  )
}

export default SubBanners
