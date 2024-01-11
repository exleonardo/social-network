import { useHistory } from 'react-router-dom'

import { getIsAuth } from '@/components/Login/login-selectors'
import { useAppSelector } from '@/redux/redux-store'
import {
  BookOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  StepForwardOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'

import s from './navbar.module.scss'

export const Navbar = () => {
  const history = useHistory()
  const isAuth = useAppSelector(getIsAuth)
  const moveToPage = (event: { key: string }) => {
    if (isAuth) {
      history.push(`/`)
      history.push(`${event.key}`)
    } else {
      history.push(`/unautorized`)
    }
  }

  return (
    <Menu
      className={s.menu}
      defaultSelectedKeys={['profile']}
      items={[
        {
          icon: <UserOutlined rev={undefined} />,
          key: 'profile',
          label: 'Profile',
        },
        {
          icon: <VideoCameraOutlined rev={undefined} />,
          key: 'users',
          label: 'Users',
        },
        {
          icon: <MessageOutlined rev={undefined} />,
          key: 'chat',
          label: 'Message',
        },
        {
          icon: <BookOutlined rev={undefined} />,
          key: 'news',
          label: 'News',
        },
        {
          icon: <StepForwardOutlined rev={undefined} />,
          key: 'music',
          label: 'Music',
        },
        {
          icon: <PlayCircleOutlined rev={undefined} />,
          key: 'video',
          label: 'Video',
        },
      ]}
      mode={'inline'}
      onClick={moveToPage}
      theme={'dark'}
    />
  )
}
