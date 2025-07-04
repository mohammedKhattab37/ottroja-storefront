import { Headphones } from 'lucide-react'

function FooterServices({ services }: { services: { title: string; description: string }[] }) {
  return (
    <div className="text-secondary absolute -top-24 left-1/2 w-full -translate-x-1/2 px-5 md:px-20 lg:-top-14 lg:px-32 xl:px-24 2xl:px-44">
      <div className="grid grid-cols-2 gap-y-5 divide-x-[1px] divide-[#DDDDDD] rounded-md bg-white py-5 lg:grid-cols-4 lg:gap-y-0">
        {services.map((service, i) => (
          <div className="flex h-full items-center justify-start gap-4 px-5 py-3" key={i}>
            <div className="flex-shrink-0">
              <Headphones className="size-8" />
            </div>
            <div>
              <p className="mb-2 text-xs font-extrabold">{service.title}</p>
              <p className="text-muted text-[10px] leading-[-20px]">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FooterServices
