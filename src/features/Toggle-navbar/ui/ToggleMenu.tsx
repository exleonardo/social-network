import { useState } from 'react'

import { useAppDispatch } from '@/app/store/redux-store'
import { useToggle } from '@/features/Toggle-navbar/hook/useToggle'
import { setCollapsed } from '@/redux/profile-reducer'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { clsx } from 'clsx'

import s from '@/widgets/Header/style/index.module.scss'

export const ToggleMenu = () => {
  const [isTable, setIsMobile] = useState(window.innerWidth <= 992)
  const classes = clsx(s.headerButton, isTable && s.tableButton)
  const dispatch = useAppDispatch()
  const { collapsed } = useToggle()
  const profileCollapsed = () => {
    dispatch(setCollapsed(!collapsed))
  }

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 992)
  }

  window.addEventListener('resize', handleResize)

  return (
    <Button
      className={classes}
      icon={
        collapsed ? <MenuUnfoldOutlined rev={undefined} /> : <MenuFoldOutlined rev={undefined} />
      }
      onClick={profileCollapsed}
      style={{
        fontSize: '16px',
        height: 64,
        width: 64,
      }}
      type={'text'}
    />
  )
}
