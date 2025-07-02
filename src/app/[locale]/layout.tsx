import type { ReactNode } from 'react'
import { I18nProviderClient } from '@/locales/client'

interface LocaleLayoutProps {
  params: Promise<{ locale: string }>
  children: ReactNode
}

export default async function LocaleLayout({
  params,
  children,
}: LocaleLayoutProps) {
  const { locale } = await params
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
}
