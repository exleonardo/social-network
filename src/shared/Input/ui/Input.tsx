import { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from '../style/input.module.scss'
export type InputType = {
  className?: string
  clearField?: () => void
  errorMessage?: string
  label?: string
  placeholder?: string
  type?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>
export const Input = ({ className, placeholder, type, ...props }: InputType) => {
  const classes = clsx(s.input, className)

  return <input className={classes} placeholder={placeholder} type={type} {...props} />
}
