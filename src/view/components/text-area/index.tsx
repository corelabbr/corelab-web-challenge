import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import styles from './styles.module.scss'

type TextAreaProps = ComponentProps<'textarea'>

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea className={clsx(styles['text-area'], className)} {...props} />
  )
}
