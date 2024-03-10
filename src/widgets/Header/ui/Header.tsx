import { LoggetInUser } from '@/features/Logget-in-user/ui/LoggetInUser'
import { ToggleMenu } from '@/features/Toggle-navbar/ui/ToggleMenu'
import { clsx } from 'clsx'

import s from '../style/index.module.scss'

export const Header = () => {
  const classes = clsx(s.header)

  return (
    <header className={classes}>
      <ToggleMenu />
      <LoggetInUser />
    </header>
  )
}
