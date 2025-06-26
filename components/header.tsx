import Image from 'next/image'

function Header({ title, direction }: { title: string; direction: string }) {
  return (
    <div className="flex items-center justify-center gap-6" dir={direction}>
      <Image alt={title} src={'/assets/Header-icon.webp'} width={50} height={50} />
      <span className="text-3xl font-bold">{title}</span>
    </div>
  )
}

export default Header
