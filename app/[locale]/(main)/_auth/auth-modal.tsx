'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useAuthStore } from '@/stores/auth'
import Image from 'next/image'
import LoginForm from './forms/login-form'
import SignupForm from './forms/signup-form'

function AuthModal({ t, dir }: { t: (key: string) => string; dir: string }) {
  const { modal_type, open_modal, toggleModal } = useAuthStore()

  return (
    <Dialog open={open_modal} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="rounded-full px-5">
          {t('login.btn')}
        </Button>
      </DialogTrigger>
      <DialogContent className="text-card-foreground max-h-[90%] min-w-4/5 xl:min-w-2/3" dir={dir}>
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:divide-x">
          <div className="grid gap-5 pb-10 lg:pe-10">
            <Image src={'/assets/logo/header-logo.svg'} alt="" width={80} height={80} />
            <Image
              src={'/assets/illustrations/auth-ill.svg'}
              alt=""
              width={450}
              height={450}
              className="hidden lg:block"
            />
          </div>
          {modal_type == 'login' ? <LoginForm t={t} /> : <SignupForm t={t} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
