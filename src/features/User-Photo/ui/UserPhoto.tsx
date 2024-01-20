import { usePhoto } from '@/features/User-Photo/hooks/usePhoto'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

import s from '../style/index.module.scss'

export const UserPhoto = () => {
  const { photo } = usePhoto()

  return (
    <Avatar
      alt={''}
      className={photo ? s.userPhoto : s.userNoPhoto}
      icon={<UserOutlined />}
      shape={'square'}
      src={photo}
      style={{ borderRadius: '50%' }}
    />
  )
}
