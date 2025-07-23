import { getBundle } from '../_actions/get-bundle'
import ProductPageClient from './page.client'

interface BundlePageProps {
  params: Promise<{ bundleId: string }>
}

export default async function BundlePage({ params }: BundlePageProps) {
  const { bundleId } = await params
  const bundleData = await getBundle(bundleId)

  return (
    <div className="grid gap-y-32">
      <ProductPageClient bundleData={bundleData} />
    </div>
  )
}
