import { InputHTMLAttributes } from 'react'
import { SearchInputIcon } from '../icons'
import styles from './SearchInput.module.scss'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  handleChange: (value: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
  return (
    <div className={styles.Container}>
      <input
        type="text"
        placeholder="Pesquisar notas"
        value={props.value}
        onChange={(event) => {
          props.handleChange(event.target.value)
        }}
      />
      <SearchInputIcon />
    </div>
  )
}

export default SearchInput
