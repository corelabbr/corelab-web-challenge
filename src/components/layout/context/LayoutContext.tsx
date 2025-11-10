import { createContext, ReactNode, useContext, useState } from 'react'
import { Kind } from 'types/FilterKind'

interface LayoutContext {
  searchTerm: string
  setSearchTerm: (term: string) => void
  color: string | null
  setColor: (color: string) => void
  kind: Kind
  setKind: (type: Kind) => void
}

const LayoutContext = createContext<LayoutContext>({
  searchTerm: '',
  setSearchTerm: () => { },
  setKind: () => { },
  kind: Kind.none,
  setColor: () => {},
  color: ""
})

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [color, setColor] = useState<string | null>(null)
  const [kind, setKind] = useState(Kind.none)

  const values = {
    searchTerm,
    setSearchTerm,
    color,
    setColor,
    kind,
    setKind
  }
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(LayoutContext)
