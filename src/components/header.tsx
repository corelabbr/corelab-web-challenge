import Image from 'next/image'
import { Suspense } from 'react'
import { HeaderDropdownMenu } from '@/components/header-dropdown-menu'
import { NotesSearch } from '@/components/notes-search'

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between gap-3 bg-white px-6 shadow-[0_1px_8px_rgba(149,149,149,0.25)] lg:px-9">
      <div className="flex flex-1 items-center">
        <div className="relative size-7.5 shrink-0 md:size-9">
          <Image src="/icon.png" alt="Logo" fill />
        </div>

        <h1 className="ml-3.5 hidden text-[#455A64] text-xs leading-none md:block md:text-sm">
          CoreNotes
        </h1>

        <Suspense>
          <NotesSearch />
        </Suspense>
      </div>

      <HeaderDropdownMenu />
    </header>
  )
}
