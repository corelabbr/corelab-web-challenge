import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './styles.module.scss'

type InputProps = ComponentProps<'input'>

export function Input({ className, ...props }: InputProps) {
  return <input className={clsx(styles.input, className)} {...props} />
}
