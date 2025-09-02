import { useDebounce } from '@/app/hooks/use-debounce'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Input } from '../../input'
import styles from './styles.module.scss'

export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    const searchUrl = searchParams.get('search') || ''

    return searchUrl
  })

  const searchDebounced = useDebounce(search, 500)

  useEffect(() => {
    setSearchParams((prevParam) => {
      if (!searchDebounced) {
        prevParam.delete('search')
        return prevParam
      }

      prevParam.set('search', searchDebounced)
      return prevParam
    })
  }, [searchDebounced, setSearchParams])

  return (
    <label htmlFor="search-input" className={styles.container}>
      <span className={styles.containerIcon}>
        <Search className={styles.icon} />
      </span>
      <Input
        placeholder="Search notes ..."
        id="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.inputSearch}
      />
    </label>
  )
}
