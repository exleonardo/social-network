import { useAppSelector } from '@/app/store/redux-store'
import { Navbar } from '@/features/Navbar/ui/Navbar'
import { getCollapsed } from '@/pages/Profile/selectors/profile-selector'
import Sider from 'antd/es/layout/Sider'

import s from '../style/index.module.scss'

export const Navigate = () => {
  const collapsed = useAppSelector(getCollapsed)

  return (
    <Sider
      className={s.menu}
      collapsed={collapsed}
      style={{
        background: 'inherit',
      }}
    >
      <Navbar />
    </Sider>
  )
}
