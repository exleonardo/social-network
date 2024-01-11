import { NavLink } from 'react-router-dom'

import { logOut } from '@/redux/auth-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import s from './header.module.scss'

import { Button } from '../../../node_modules/antd/es/index'
import { getIsAuth, getLogin } from '../Login/login-selectors'

type HeaderType = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}
export const Header = ({ collapsed, setCollapsed }: HeaderType) => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getIsAuth)
  const login = useAppSelector(getLogin)

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
        onClick={() => setCollapsed(!collapsed)}
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
