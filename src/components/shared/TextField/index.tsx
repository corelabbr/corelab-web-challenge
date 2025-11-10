import { ComponentProps, ReactNode } from 'react'
import styles from './TextField.module.scss'
import clsx from 'clsx'
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'

interface TextFieldProps extends ComponentProps<'input'> {
  icon?: ReactNode
  classNameBox?: string
  register?: UseFormRegister<any>
}

export function TextField({
  icon,
  classNameBox,
  register = () => ({}) as UseFormRegisterReturn<any>,
  ...rest
}: TextFieldProps) {
  return (
    <div className={clsx(styles.Input, classNameBox)}>
      <input
        {...rest}
        {...register(rest.name || '')}
        className={clsx(styles.field, rest.className)}
      />
      {icon ? icon : null}
    </div>
  )
}
