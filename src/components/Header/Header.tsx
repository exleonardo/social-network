import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getCollapsed } from '@/components/Profile/profile-selector'
import { logOut } from '@/redux/auth-reducer'
import { setCollapsed } from '@/redux/profile-reducer'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import s from './header.module.scss'

import { Button } from '../../../node_modules/antd/es/index'
import { getIsAuth, getLogin } from '../Login/auth-selectors'

export const Header = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getIsAuth)
  const login = useAppSelector(getLogin)
  const collapsed = useAppSelector(getCollapsed)
  const profileCollapsed = () => {
    dispatch(setCollapsed(!collapsed))
  }

  const loggedOut = () => {
    dispatch(logOut())
  }

  return (
    <header className={s.header}>
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
      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            {login}
            <Button onClick={loggedOut}>Log out</Button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  )
}
