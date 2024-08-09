'use client'

import { ReactNode } from 'react'
import { NoteProvider } from './contexts/NoteContext'

type ProvidersProps = {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <NoteProvider>
      {children}
    </NoteProvider>
  )
}
