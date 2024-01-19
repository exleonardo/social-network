import { ComponentPropsWithoutRef } from 'react'

import icon from '../../images/icons.svg'
type IconProps = {
  className?: string
  name: string
  size?: string
} & ComponentPropsWithoutRef<'svg'>

export const Icon = ({ className, name, size = '16px', ...rest }: IconProps) => {
  return (
    <svg className={className} height={size} width={size} {...rest}>
      <use href={`${icon}#${name}`} />
    </svg>
  )
}
