import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import s from '../style/button.module.scss'
export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props
  const classes = clsx(s.button, className)

  return <Component className={classes} {...rest} />
}
