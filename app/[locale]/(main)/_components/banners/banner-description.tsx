import BannerButton from '@/components/banner-button'
import Image from 'next/image'

function BannerDescription({
  title,
  sub_title,
  bannerItems,
  button_text,
  button_destination,
}: {
  title: string
  sub_title: string
  bannerItems?: string[]
  button_text: string
  button_destination: string
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-[44px]">{title}</h1>
        <p className="text-secondary/80 text-base leading-relaxed">{sub_title}</p>
      </div>
      {bannerItems && (
        <div className="text-secondary grid gap-2 text-sm font-bold">
          {bannerItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <Image
                alt="list item"
                src={'/assets/illustrations/list-indicator.svg'}
                width={25}
                height={20}
              />
              <p>
                {/* {item.quantity > 1 && <span className="font-bold">{item.quantity}x </span>} */}
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
      <BannerButton text={button_text} url={button_destination} size="sm" />
    </div>
  )
}

export default BannerDescription
