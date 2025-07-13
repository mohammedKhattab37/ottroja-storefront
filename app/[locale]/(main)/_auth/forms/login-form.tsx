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
import { Link } from '@/i18n/navigation'
import { SignInSchema } from '@/zod/auth-shcema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

function LoginForm({
  t,
  setHasAccount,
}: {
  t: (key: string) => string
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isPending, startTransition] = useTransition()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { control } = form

  return (
    <div className="lg:ps-10">
      <DialogHeader>
        <DialogTitle>{t('login.title')}</DialogTitle>
        <DialogDescription>{t('login.sub-title')}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 py-10">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('login.form.email')}</FormLabel>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('login.form.password')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      className="bg-filter-trigger pe-9"
                      placeholder="••••••••"
                      type={isVisible ? 'text' : 'password'}
                    />
                    <Button
                      size={'icon'}
                      variant={'vanilla'}
                      type="button"
                      className="hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => setIsVisible(!isVisible)}
                      aria-label={isVisible ? 'Hide password' : 'Show password'}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
                <div className="flex w-full justify-between text-xs font-normal">
                  <div className="flex w-fit items-center gap-1">
                    <Checkbox id="remember_me" className="data-[state=checked]:bg-[#2DC38C]" />
                    <FormLabel htmlFor="remember_me">{t('login.check-box')}</FormLabel>
                  </div>
                  <Link href="/forgot-password" className="hover:underline">
                    {t('login.forgot-pass')}
                  </Link>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Form>
      <DialogFooter className="block">
        <Button variant={'secondary'} className="w-full rounded-full py-5" type="submit">
          {t('login.btn')}
        </Button>
        <div className="flex items-center justify-center pt-4 text-xs">
          <span>{t('login.dont-have-account')}</span>
          <Button
            type="button"
            onClick={() => setHasAccount(false)}
            size={'sm'}
            variant={'vanilla'}
            className="p-1 font-bold"
          >
            {t('login.redirect')}
          </Button>
        </div>
      </DialogFooter>
    </div>
  )
}

export default LoginForm
