import { ComponentPropsWithoutRef } from 'react'

import s from './input.module.scss'
export type InputType = {
  className?: string
  clearField?: () => void
  errorMessage?: string
  label?: string
  placeholder?: string
  type?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>
export const Input = ({ className, placeholder, type, ...props }: InputType) => {
  return (
    <input
      className={className ? className : s.input}
      placeholder={placeholder}
      type={type}
      {...props}
    />
  )
}
