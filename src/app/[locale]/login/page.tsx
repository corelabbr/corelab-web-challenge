import Image from 'next/image'
import { LoginForm } from '@/components/login-form'
import { getScopedI18n } from '@/locales/server'

export default async function Login() {
  const t = await getScopedI18n('login')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <div className="relative size-8 md:size-10">
          <Image src="/icon.png" alt="Logo" fill />
        </div>
      </div>

      <main className="mx-6 flex max-w-sm flex-col gap-5 md:max-w-md">
        <div className="flex flex-col gap-2.5">
          <h1 className="font-medium text-2xl text-[#333333] md:text-3xl">
            {t('title')}
          </h1>

          <h2 className="font-medium text-[#4F4F4D] text-xl md:text-2xl">
            {t('description')}
          </h2>
        </div>

        <LoginForm />
      </main>
    </div>
  )
}
