import Image from 'next/image'

function WhyChooseUs({ t }: { t: (key: string) => string }) {
  const itemsList = [
    {
      title: t('packaging'),
      description: t('packaging-description'),
      icon: '/assets/illustrations/about-us/pack.svg',
      iconSize: 40,
    },
    {
      title: t('quality'),
      description: t('quality-description'),
      icon: '/assets/illustrations/about-us/quality.svg',
      iconSize: 50,
    },
    {
      title: t('delivery'),
      description: t('delivery-description'),
      icon: '/assets/illustrations/about-us/delivery.svg',
      iconSize: 50,
    },
    {
      title: t('support'),
      description: t('support-description'),
      icon: '/assets/illustrations/about-us/support.svg',
      iconSize: 50,
    },
  ]

  return (
    <div className="container-padding">
      <div className="grid place-items-center gap-10 pb-20 text-center">
        <p className="text-2xl font-bold">{t('title')}</p>
        <span className="w-full text-justify text-sm leading-9 font-medium md:w-[90%] md:text-center lg:w-2/3">
          {t('content')}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-20 py-10 md:grid-cols-2 lg:gap-x-20">
        {itemsList.map((item) => (
          <div
            key={item.title}
            className="bg-filter-trigger relative grid gap-3 rounded-sm px-5 pt-20 pb-10 drop-shadow-sm"
          >
            <div className="bg-primary/60 absolute start-5 -top-10 h-18 w-18 content-center justify-items-center rounded-sm">
              <Image src={item.icon} alt="" width={item.iconSize} height={item.iconSize} />
            </div>
            <div>
              <p className="pb-4 text-sm font-bold">{item.title}</p>
              <p className="text-xs leading-9 font-medium">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyChooseUs
