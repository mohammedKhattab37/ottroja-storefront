import Image from 'next/image'

function Header({ title, direction }: { title: string; direction: string }) {
  return (
    <div className="flex items-center justify-center gap-6" dir={direction}>
      <Image alt={title} src={'/assets/illustrations/header-icon.svg'} width={50} height={50} />
      <span className="text-2xl font-bold md:text-3xl">{title}</span>
    </div>
  )
}

export default Header
