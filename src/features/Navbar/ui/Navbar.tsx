import { useNavbar } from '@/features/Navbar/hooks/useNavbar'
import {
  BookOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'

import s from '../style/index.module.scss'

export const Navbar = () => {
  const { history, isAuth } = useNavbar()
  const items = [
    {
      icon: <UserOutlined rev={undefined} />,
      key: 'profile',
      label: 'Profile',
    },
    {
      icon: <TeamOutlined rev={undefined} />,
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
      icon: <PlayCircleOutlined rev={undefined} />,
      key: 'video',
      label: 'Video',
    },
  ]
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
      items={items}
      mode={'inline'}
      onClick={moveToPage}
      theme={'light'}
    />
  )
}
