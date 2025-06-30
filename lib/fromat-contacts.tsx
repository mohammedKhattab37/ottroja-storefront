import { Mail, MapPin, Phone } from 'lucide-react'

export function formatContactsInfo({
  t,
  contacts,
}: {
  t: (key: string) => string
  contacts: { title: string; value: string }[]
}) {
  const contactMeta: Record<string, { icon: React.ReactNode; label: string }> = {
    address: {
      icon: <MapPin className="size-5" />,
      label: t('footer.contacts.address'),
    },
    mail: {
      icon: <Mail className="size-5" />,
      label: t('footer.contacts.mail'),
    },
    phone: {
      icon: <Phone className="size-5" />,
      label: t('footer.contacts.phone'),
    },
  }
  return contacts.map((contact) => {
    const meta = contactMeta[contact.title]
    if (!meta) return null
    return {
      label: meta.label,
      icon: meta.icon,
      value: contact.value,
    }
  })
}
