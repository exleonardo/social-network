import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getCollapsed } from '@/components/profile-selector'
import { setCollapsed } from '@/redux/profile-reducer'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import s from '@/widgets/Header/header.module.scss'

export const ToggleMenu = () => {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector(getCollapsed)
  const profileCollapsed = () => {
    dispatch(setCollapsed(!collapsed))
  }

  return (
    <Button
      className={s.headerButton}
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
