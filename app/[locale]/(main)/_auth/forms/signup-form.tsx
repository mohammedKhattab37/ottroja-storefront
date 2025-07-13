import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SignUpSchema } from '@/zod/auth-shcema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

function SignupForm({
  t,
  setHasAccount,
}: {
  t: (key: string) => string
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isPending, startTransition] = useTransition()
  const [isVisible1, setIsVisible1] = useState<boolean>(false)
  const [isVisible2, setIsVisible2] = useState<boolean>(false)

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const { control } = form

  return (
    <div className="lg:ps-10">
      <DialogHeader>
        <DialogTitle>{t('sign-up.title')}</DialogTitle>
        <DialogDescription>{t('sign-up.sub-title')}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 py-10">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.f-name')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('sign-up.form.f-name')}
                      className="bg-filter-trigger"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.l-name')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('sign-up.form.l-name')}
                      className="bg-filter-trigger"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sign-up.form.email')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="example@ex.com"
                    type="email"
                    className="bg-filter-trigger"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        className="bg-filter-trigger pe-9"
                        placeholder="••••••••"
                        type={isVisible1 ? 'text' : 'password'}
                      />
                      <Button
                        size={'icon'}
                        variant={'vanilla'}
                        type="button"
                        className="hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => setIsVisible1(!isVisible1)}
                        aria-label={isVisible1 ? 'Hide password' : 'Show password'}
                        aria-pressed={isVisible1}
                        aria-controls="password"
                      >
                        {isVisible1 ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.re-password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        className="bg-filter-trigger pe-9"
                        placeholder="••••••••"
                        type={isVisible2 ? 'text' : 'password'}
                      />
                      <Button
                        size={'icon'}
                        variant={'vanilla'}
                        type="button"
                        className="hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={() => setIsVisible2(!isVisible2)}
                        aria-label={isVisible2 ? 'Hide password' : 'Show password'}
                        aria-pressed={isVisible2}
                        aria-controls="password"
                      >
                        {isVisible2 ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-fit items-center gap-1">
            <Checkbox id="remember_me" className="data-[state=checked]:bg-[#2DC38C]" />
            <FormLabel htmlFor="remember_me">{t('sign-up.check-box')}</FormLabel>
          </div>
        </div>
      </Form>
      <DialogFooter className="block">
        <Button variant={'secondary'} className="w-full rounded-full py-5" type="submit">
          {t('sign-up.btn')}
        </Button>
        <div className="flex items-center justify-center pt-4 text-xs">
          <span>{t('sign-up.have-account')}</span>
          <Button
            type="button"
            onClick={() => setHasAccount(true)}
            size={'sm'}
            variant={'vanilla'}
            className="p-1 font-bold"
          >
            {t('sign-up.redirect')}
          </Button>
        </div>
      </DialogFooter>
    </div>
  )
}

export default SignupForm
