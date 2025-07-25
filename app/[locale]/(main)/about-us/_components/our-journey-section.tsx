import { Link } from '@/i18n/navigation'
import Image from 'next/image'

function OurJourneySection({ t }: { t: (key: string) => string }) {
  return (
    <div className="full-width-section bg-filter-trigger pt-20 pb-40">
      <div className="place-items-center pt-20 text-center">
        <p className="pb-10 text-2xl font-bold">{t('title')}</p>
        <div className="w-full text-sm leading-9 font-medium md:w-[90%] lg:w-2/3">
          <p>{t('line1')}</p>
          <p>{t('line2')}</p>
        </div>
        {/* Socials */}
        <div className="flex gap-5 pt-5 text-xs font-bold">
          <SocialLink
            title={t('instagram')}
            icon="/assets/socials/instagram-colored.svg"
            href="/"
            color1="hsla(30, 100%, 50%, 1)"
            color2="hsla(320, 99%, 44%, 1)"
          />
          <SocialLink
            title={t('youtube')}
            icon="/assets/socials/youtube-colored.svg"
            href="/"
            color1="hsla(348, 83%, 46%, 1)"
          />
        </div>
        <div className="grid grid-cols-1 gap-1 py-10 sm:gap-2 md:grid-cols-3 md:gap-4">
          <div className="mb-0 grid justify-items-end gap-1 self-start sm:gap-2 md:gap-4 lg:-mb-20 lg:self-end">
            <Image
              src={'/assets/gallery/left-right.svg'}
              alt=""
              width={380}
              height={380}
              className="w-full md:w-fit"
            />
            <Image
              src={'/assets/gallery/right.svg'}
              alt=""
              width={300}
              height={300}
              className="w-full lg:w-fit"
            />
          </div>
          <Image
            src={'/assets/gallery/center.svg'}
            alt=""
            width={100}
            height={100}
            className="h-full w-full"
          />
          <div className="grid justify-items-start gap-1 sm:gap-2 md:gap-4">
            <Image
              src={'/assets/gallery/left.svg'}
              alt=""
              width={300}
              height={300}
              className="w-full lg:w-fit"
            />
            <Image
              src={'/assets/gallery/left-right.svg'}
              alt=""
              width={380}
              height={380}
              className="w-full md:w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurJourneySection

function SocialLink({
  title,
  icon,
  href,
  color1,
  color2,
}: {
  title: string
  icon: string
  href: string
  color1: string
  color2?: string
}) {
  return (
    <Link
      href={href}
      className="relative inline-block rounded-full px-5 py-2"
      style={{
        border: '2px solid transparent',
        background: `linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(90deg, ${color1}, ${color2 ? color2 : color1}) border-box`,
      }}
    >
      <div
        className="flex items-center gap-1 font-semibold"
        style={{
          background: `linear-gradient(90deg, ${color1}, ${color2 ? color2 : color1})`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        <Image src={icon} alt="" width={20} height={20} />
        {title}
      </div>
    </Link>
  )
}
