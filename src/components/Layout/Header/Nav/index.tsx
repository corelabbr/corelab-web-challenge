'use client'

import Search from '@/components/Search'
import Logo from '../Logo'
import styles from './Nav.module.scss'
import { XIcon } from '@/components/Icons'
import Colors from '@/types/Colors'
import { useState } from 'react'
import todoHook from '@/hooks/todoHook'

function Nav() {
  const { setFilter, filter } = todoHook()
  const [isFocus, setIsFocus] = useState(false)

  const colorsEntries = Object.entries(Colors)
  colorsEntries.shift()

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsFocus(false)
    }, 50)
  }

  const onChangeColor = (color: keyof typeof Colors) => {
    setFilter((prev) => ({ ...prev, color }))
  }

  const onChangeInput = (text: string) => {
    setFilter((prev) => ({ ...prev, text }))
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <Logo />
        <div className={styles.search_container}>
          <Search
            onChange={(ev) => onChangeInput(ev.target.value)}
            value={filter.text}
            placeholder="Pesquisar notas"
            onBlur={handleOnBlur}
            onFocus={() => setIsFocus(true)}
          />
          {isFocus && (
            <div className={styles.dropdown}>
              {colorsEntries.map(([key, value]) => (
                <article
                  className={styles.dropdown_value}
                  key={`${key} - ${value}`}
                  onClick={() => onChangeColor(key as keyof typeof Colors)}
                >
                  <div className={`${styles.color} ${styles[value]}`} />
                  Cor {value.split('r')[1]}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.icon}>
        <XIcon onClick={() => setFilter({ text: '', color: null })} />
      </div>
    </nav>
  )
}

export default Nav
