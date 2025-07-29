import { Bundle } from '@/app/[locale]/(main)/_actions/get-bundles'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateBundleAvailability = (bundle: Bundle) => {
  // Calculate how many complete bundles can be made
  let maxBundles = Infinity
  let hasOutOfStock = false

  bundle.bundleItems.forEach((b_it) => {
    if (!b_it.variant.inventory || b_it.variant.inventory.quantityAvailable === 0) {
      hasOutOfStock = true
      maxBundles = 0
      return
    }

    // Calculate how many bundles this variant can support
    const bundlesFromThisVariant = Math.floor(
      b_it.variant.inventory.quantityAvailable / b_it.quantity,
    )

    maxBundles = Math.min(maxBundles, bundlesFromThisVariant)
  })

  if (hasOutOfStock || maxBundles === 0) {
    return { status: 'out-of-stock', availableQuantity: 0 }
  } else if (maxBundles <= 10) {
    return { status: 'low-stock', availableQuantity: maxBundles }
  } else {
    return { status: 'in-stock', availableQuantity: maxBundles }
  }
}
