import { LoggetInUser } from '@/features/Logget-in-user/ui/LoggetInUser'
import { ToggleMenu } from '@/features/Toggle-navbar/ToggleMenu'

import s from '../style/index.module.scss'

export const Header = () => {
  return (
    <header className={s.header}>
      <ToggleMenu />
      <LoggetInUser />
    </header>
  )
}
