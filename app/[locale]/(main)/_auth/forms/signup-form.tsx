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
import { useAuthStore } from '@/stores/auth'
import { CustomerRegisterSchema } from '@/zod/auth-shcema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { registerCustomer } from '../_actions'

function SignupForm({ t }: { t: (key: string) => string }) {
  const [isPending, startTransition] = useTransition()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { setAuthModalType } = useAuthStore()

  const form = useForm<z.infer<typeof CustomerRegisterSchema>>({
    resolver: zodResolver(CustomerRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof CustomerRegisterSchema>) {
    startTransition(async () => {
      try {
        console.log('Form values before submission:', {
          ...values,
          password: '[REDACTED]',
        })

        const result = await registerCustomer(values)

        console.log('Registration result:', {
          success: result.success,
          error: result.success ? null : result.error,
        })

        if (result.success) {
          console.log('Registration successful:', result.message)
          // Close the modal or redirect
          window.location.reload() // Simple reload for now, you might want to use router.refresh() or close modal
        } else {
          console.error('Registration failed:', result.error)

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
        console.error('Registration error:', error)
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
        <DialogTitle>{t('sign-up.title')}</DialogTitle>
        <DialogDescription>{t('sign-up.sub-title')}</DialogDescription>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.f-name')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Full Name"
                      className="bg-filter-trigger"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.email')}</FormLabel>
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
                  <FormLabel>{t('sign-up.form.password')}</FormLabel>
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
                </FormItem>
              )}
            />

            <div className="flex w-fit items-center gap-1">
              <Checkbox id="remember_me" className="data-[state=checked]:bg-[#2DC38C]" />
              <FormLabel htmlFor="remember_me">{t('sign-up.check-box')}</FormLabel>
            </div>
          </div>

          <DialogFooter className="block">
            <Button
              variant={'secondary'}
              className="w-full rounded-full py-5"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Creating account...' : t('sign-up.btn')}
            </Button>
            <div className="flex items-center justify-center pt-4 text-xs">
              <span>{t('sign-up.have-account')}</span>
              <Button
                type="button"
                onClick={() => setAuthModalType('login')}
                size={'sm'}
                variant={'vanilla'}
                className="p-1 font-bold"
                disabled={isPending}
              >
                {t('sign-up.redirect')}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </div>
  )
}

export default SignupForm
