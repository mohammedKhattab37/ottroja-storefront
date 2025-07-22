import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { countries, governorates } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { useCheckoutStore } from '@/stores/checkout'
import { addressSchema } from '@/zod/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Home } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { AddressData, GetCustomerAddresses } from '../../_actions/get-addresses'

export type CheckoutAddressData = z.infer<typeof addressSchema>

const AddressStep = ({ t }: { t: (key: string) => string }) => {
  const { submitAddressForm, next, isSubmitting, customerId } = useCheckoutStore()
  const [previousAddresses, setPreviousAddresses] = useState<AddressData[] | undefined>()
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>()

  const form = useForm<CheckoutAddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {},
    mode: 'onChange',
  })
  const { control, watch } = form
  //const country = watch('country')

  useEffect(() => {
    const fetchAddresses = async () => {
      const addresses = await GetCustomerAddresses(customerId)
      if (addresses.success) {
        setPreviousAddresses(addresses.addresses)
      }
    }

    fetchAddresses()
  }, [customerId])

  const handleNext = async () => {
    try {
      if (selectedAddressId) {
        useCheckoutStore.setState({ shippingAddressId: selectedAddressId })
      } else {
        const addressCreated = await submitAddressForm(form.getValues())

        if (!addressCreated) {
          form.trigger()
          return
        }
      }
      next()
    } catch (error) {
      console.log('Validation error:', error)
      form.trigger()
    }
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        {previousAddresses && previousAddresses.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{t('step2.previous')}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-2">
          {previousAddresses?.map((address, idx) => (
            <div
              key={idx}
              onClick={() =>
                selectedAddressId == address.id
                  ? setSelectedAddressId(undefined)
                  : setSelectedAddressId(address.id)
              }
              className={cn(
                'bg-background flex h-full w-full cursor-pointer gap-4 rounded-md p-4 text-start drop-shadow-xs',
                address.id == selectedAddressId ? 'border-primary border-2' : '',
              )}
            >
              <div className="self-center">
                <Home className="size-10" />
              </div>
              <div className="w-full space-y-1">
                <div className="text-card-foreground line-clamp-1 text-sm font-medium">
                  <span>
                    {t('step2.building')} {address.building},{' '}
                  </span>
                  <span>
                    {t('step2.apartment')} {address.apartment}
                  </span>
                </div>
                <div className="text-secondary line-clamp-1 text-sm">
                  {address.district}, {address.city}, {address.state}, {address.country}
                </div>
                {address.extra_address && (
                  <div className="text-checkout-step-muted line-clamp-1 w-full text-xs italic">
                    {address.extra_address}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">{t('step2.title')}</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-2 xl:grid-cols-3">
          <FormField
            disabled={isSubmitting || selectedAddressId != undefined}
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.country')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting || selectedAddressId != undefined}
                >
                  <FormControl>
                    <SelectTrigger
                      iconStyles="text-secondary size-5 opacity-100 stroke-3"
                      className={
                        'bg-background text-secondary w-full border-none py-5 shadow-none focus-visible:ring-0'
                      }
                    >
                      <SelectValue placeholder={t('step2.country')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-secondary bg-background">
                    {countries.map((choice) => (
                      <SelectItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isSubmitting || selectedAddressId != undefined}
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.governorate')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting || selectedAddressId != undefined}
                >
                  <FormControl>
                    <SelectTrigger
                      iconStyles="text-secondary size-5 opacity-100 stroke-3"
                      className={
                        'bg-background text-secondary w-full border-none py-5 shadow-none focus-visible:ring-0'
                      }
                    >
                      <SelectValue placeholder={t('step2.governorate')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-secondary bg-background">
                    {governorates.egypt.map((choice) => (
                      <SelectItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="city"
            disabled={isSubmitting || selectedAddressId != undefined}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.city')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.city')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="district"
            disabled={isSubmitting || selectedAddressId != undefined}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.district')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.district')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="building"
            disabled={isSubmitting || selectedAddressId != undefined}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.building')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.building')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="apartment"
            disabled={isSubmitting || selectedAddressId != undefined}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.apartment')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.apartment')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="postal_code"
            disabled={isSubmitting || selectedAddressId != undefined}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.postal-code')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.postal-code')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="extra_address"
            disabled={isSubmitting || selectedAddressId != undefined}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>{t('step2.extra-address')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.extra-address')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          variant={'secondary'}
          type="button"
          disabled={isSubmitting}
          onClick={handleNext}
          className="rounded-full p-5 px-24 text-xs font-bold"
        >
          {t('next')}
        </Button>
      </div>
    </Form>
  )
}

export default AddressStep
