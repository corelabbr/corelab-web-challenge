'use client'

import { Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from '@/locales/client'
import { server } from '@/server'

export function HeaderDropdownMenu() {
  const t = useScopedI18n('home.dropdown_menu')
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()

  const router = useRouter()

  function handleSwitchLanguage() {
    changeLocale(locale === 'en' ? 'pt' : 'en')
  }

  async function handleLogout() {
    await server.logout.$delete()
    router.replace('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={handleSwitchLanguage}>
          {t('switch_language_text')}
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={handleLogout}>
          {t('logout_text')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
