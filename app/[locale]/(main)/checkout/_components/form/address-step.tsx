import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cities, countries, governorates } from '@/lib/dummy-data'
import { UseFormReturn } from 'react-hook-form'
import { CheckoutFormData } from './checkout-form'

const AddressStep = ({
  t,
  form,
}: {
  t: (key: string) => string
  form: UseFormReturn<CheckoutFormData>
}) => {
  const { control, watch } = form
  //const country = watch('address.country')
  //const governance = watch('address.governance')

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t('title')}</h2>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-2 xl:grid-cols-3">
        <FormField
          control={control}
          name="address.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('country')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    iconStyles="text-secondary size-5 opacity-100 stroke-3"
                    className={
                      'bg-background text-secondary w-full border-none py-5 shadow-none focus-visible:ring-0'
                    }
                  >
                    <SelectValue placeholder={t('country')} />
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
          control={control}
          name="address.governorate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('governorate')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    iconStyles="text-secondary size-5 opacity-100 stroke-3"
                    className={
                      'bg-background text-secondary w-full border-none py-5 shadow-none focus-visible:ring-0'
                    }
                  >
                    <SelectValue placeholder={t('governorate')} />
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
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('city')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    iconStyles="text-secondary size-5 opacity-100 stroke-3"
                    className={
                      'bg-background text-secondary w-full border-none py-5 shadow-none focus-visible:ring-0'
                    }
                  >
                    <SelectValue placeholder={t('city')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-secondary bg-background">
                  {cities.cairo.map((choice) => (
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
          name="address.district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('district')}</FormLabel>
              <FormControl>
                <Input placeholder={t('district')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address.building"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('building')}</FormLabel>
              <FormControl>
                <Input placeholder={t('building')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address.apartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('apartment')}</FormLabel>
              <FormControl>
                <Input placeholder={t('apartment')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address.postal_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('postal-code')}</FormLabel>
              <FormControl>
                <Input placeholder={t('postal-code')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address.extra_address"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>{t('extra-address')}</FormLabel>
              <FormControl>
                <Input placeholder={t('extra-address')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default AddressStep
