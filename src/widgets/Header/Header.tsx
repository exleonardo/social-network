import { LoggetInUser } from '@/features/Logget-in-user/LoggetInUser'
import { ToggleMenu } from '@/features/Toggle-navbar/ToggleMenu'

import s from './header.module.scss'

export const Header = () => {
  return (
    <header className={s.header}>
      <ToggleMenu />
      <LoggetInUser />
    </header>
  )
}
