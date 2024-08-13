import { ChangeEventHandler, FocusEventHandler } from 'react'
import styles from './Search.module.scss'

type SearchType = {
  placeholder: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

export default function Search({ onChange, placeholder, value, onBlur, onFocus }: SearchType) {
  return (
    <input
      className={styles.search}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}
