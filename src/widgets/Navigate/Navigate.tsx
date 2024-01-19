import { useAppSelector } from '@/app/redux-store'
import { getCollapsed } from '@/components/profile-selector'
import { Navbar } from '@/features/Navbar/Navbar'
import Sider from 'antd/es/layout/Sider'

import s from './navigate.module.scss'

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
