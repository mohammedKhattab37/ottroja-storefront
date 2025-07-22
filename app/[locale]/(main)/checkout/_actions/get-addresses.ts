'use server'

export interface AddressData {
  id: string
  city: string
  state: string
  country: string
  district: string
  building: string
  apartment: string
  extra_address?: string
  postal_code: string
}

export async function GetCustomerAddresses(
  customerId: string | null,
): Promise<{ success: boolean; addresses?: AddressData[]; error: string }> {
  try {
    if (customerId == null) {
      return { success: false, error: 'No customer is provided' }
    }
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const response = await fetch(`${baseUrl}/customers/address?customerId=${customerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Address creation failed',
      }
    }

    return {
      success: true,
      addresses: result.addresses,
      error: '',
    }
  } catch (error) {
    console.error('Addresses fetching error:', error)

    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
