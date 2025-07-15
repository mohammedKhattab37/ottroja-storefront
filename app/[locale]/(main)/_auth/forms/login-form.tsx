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
import { CustomerLoginSchema } from '@/zod/auth-shcema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { loginCustomer } from '../_actions'

function LoginForm({
  t,
  setHasAccount,
}: {
  t: (key: string) => string
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isPending, startTransition] = useTransition()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const form = useForm<z.infer<typeof CustomerLoginSchema>>({
    resolver: zodResolver(CustomerLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof CustomerLoginSchema>) {
    startTransition(async () => {
      try {
        const result = await loginCustomer(values)

        if (result.success) {
          console.log('Login successful:', result.message)
          // Close the modal or redirect
          window.location.reload() // Simple reload for now, you might want to use router.refresh() or close modal
        } else {
          console.error('Login failed:', result.error)

          // Handle field-specific errors
          if (result.issues) {
            result.issues.forEach((issue) => {
              const fieldName = issue.path[0] as keyof typeof values
              if (fieldName in values) {
                form.setError(fieldName, {
                  type: 'server',
                  message: issue.message,
                })
              }
            })
          } else {
            // Set a general error message
            form.setError('root', {
              type: 'server',
              message: result.error,
            })
          }
        }
      } catch (error) {
        console.error('Login error:', error)
        form.setError('root', {
          type: 'server',
          message: 'An unexpected error occurred',
        })
      }
    })
  }

  return (
    <div className="lg:ps-10">
      <DialogHeader>
        <DialogTitle>{t('login.title')}</DialogTitle>
        <DialogDescription>{t('login.sub-title')}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 py-10">
            {form.formState.errors.root && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login.form.email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
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
                        disabled={isPending}
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

          <DialogFooter className="block">
            <Button
              variant={'secondary'}
              className="w-full rounded-full py-5"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : t('login.btn')}
            </Button>
            <div className="flex items-center justify-center pt-4 text-xs">
              <span>{t('login.dont-have-account')}</span>
              <Button
                type="button"
                onClick={() => setHasAccount(false)}
                size={'sm'}
                variant={'vanilla'}
                className="p-1 font-bold"
                disabled={isPending}
              >
                {t('login.redirect')}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
