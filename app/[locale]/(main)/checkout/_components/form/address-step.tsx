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
import { useCheckoutStore } from '@/stores/checkout'
import { addressSchema } from '@/zod/checkout-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

export type CheckoutAddressData = z.infer<typeof addressSchema>

const AddressStep = ({ t }: { t: (key: string) => string }) => {
  const { submitAddressForm, next, isSubmitting } = useCheckoutStore()
  const form = useForm<CheckoutAddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {},
    mode: 'onChange',
  })
  const { control, watch } = form
  //const country = watch('country')

  const handleNext = async () => {
    try {
      const addressCreated = await submitAddressForm(form.getValues())

      if (addressCreated) {
        next()
      } else {
        form.trigger()
      }
    } catch (error) {
      console.log('Validation error:', error)
      form.trigger()
    }
  }


  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{t('step2.title')}</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-2 xl:grid-cols-3">
          <FormField
            disabled={isSubmitting}
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.country')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            disabled={isSubmitting}
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.governorate')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.city')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.city')} {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.district')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.district')} {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.building')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.building')} {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="apartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.apartment')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.apartment')} {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('step2.postal-code')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('step2.postal-code')} {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="extra_address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>{t('step2.extra-address')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('step2.extra-address')}
                    {...field}
                    disabled={isSubmitting}
                  />
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
