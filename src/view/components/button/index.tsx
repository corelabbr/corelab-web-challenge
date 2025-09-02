import clsx from 'clsx'
import type { ComponentProps } from 'react'
import styles from './styles.module.scss'

type ButtonProps = ComponentProps<'button'> & {
  variants?: 'primary' | 'ghost'
}

export function Button({
  className,
  variants = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      data-variant={variants}
      className={clsx(styles.button, className)}
      {...props}
    />
  )
}
