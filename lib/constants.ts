export const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api'

export const locals = [
  { name: 'en', flag: '/assets/locals/english.svg' },
  { name: 'ar', flag: '/assets/locals/arabic.svg' },
]

export const paymentIcons = [
  {
    name: 'visa.svg',
    size: 28,
  },
  {
    name: 'mastercard.svg',
    size: 28,
  },
  {
    name: 'vodafone.svg',
    size: 50,
  },
  {
    name: 'meeza.svg',
    size: 28,
  },
]

export const socialsIcons = [
  {
    name: 'facebook.svg',
    size: 18,
  },
  {
    name: 'instagram.svg',
    size: 18,
  },
  {
    name: 'youtube.svg',
    size: 18,
  },
  {
    name: 'telegram.svg',
    size: 18,
  },
]

export const zoneDelivery = [
  {
    name: 'Zone 1',
    fee: 64,
  },
  {
    name: 'Zone 2',
    fee: 69,
  },
  {
    name: 'Zone 3',
    fee: 75,
  },
  {
    name: 'Zone 4',
    fee: 87,
  },
  {
    name: 'Zone 5',
    fee: 100,
  },
  {
    name: 'Zone 6',
    fee: 103,
  },
  {
    name: 'Zone 7',
    fee: 116,
  },
]

export const importantLinks = [
  { name_en: 'Our Team', name_ar: 'فريقنا', url: '/our-team' },
  { name_en: 'Terms & Conditions', name_ar: 'الشروط و الاحكام', url: '/terms-conditions' },
  { name_en: 'Privacy Policy', name_ar: 'سياسة الخصوصية', url: '/privacy-policy' },
  { name_en: 'Return Policy', name_ar: 'سياسة الإسترجاع', url: '/return-policy' },
]

export const infoCenterLinks = [
  { name_en: 'About Ottroja', name_ar: 'عن اترجة', url: '/about-us' },
  { name_en: 'Products', name_ar: 'المنتجات', url: '/products' },
  { name_en: 'Ratings', name_ar: 'التقييمات', url: '/ratings' },
  { name_en: 'Images', name_ar: 'الصور', url: '/images' },
]
