'use client'

import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { email as zEmail } from 'zod/v4'
import { LoaderCircle } from '@/components/icons/loader-circle'
import { useScopedI18n } from '@/locales/client'
import { server } from '@/server'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const t = useScopedI18n('login.form')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)

    try {
      await server.auth.links.$post({ json: { email } })
      toast.success(t('toast.success.title'))
    } catch (error) {
      console.log(error)
      toast.error(t('toast.error.title'))
    }

    setSubmitting(false)
  }

  const emailParseResult = zEmail().safeParse(email)

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <input
        className="rounded-md border border-[#D9D9D9] px-4 py-2 outline-none"
        placeholder={t('email_placeholder')}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button
        className="flex items-center justify-center gap-2.5 rounded-md bg-[#FFA000] px-4 py-2 font-medium text-white outline-none transition-opacity disabled:pointer-events-none disabled:opacity-50"
        type="submit"
        disabled={!emailParseResult.success || submitting}
      >
        {submitting && <LoaderCircle className="size-4 animate-spin" />}

        {submitting
          ? t('submit_button.please_wait_text')
          : t('submit_button.continue_text')}
      </button>
    </form>
  )
}
