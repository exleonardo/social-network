import { useAppSelector } from '@/app/redux-store'
import { getProfile } from '@/components/profile-selector'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

import s from './user-photo.module.scss'

const UserPhoto = () => {
  const profile = useAppSelector(getProfile)

  return (
    <Avatar
      alt={''}
      className={profile?.photos.large ? s.userPhoto : s.userNoPhoto}
      icon={<UserOutlined />}
      shape={'square'}
      src={profile?.photos.large}
      style={{ borderRadius: '50%' }}
    />
  )
}

export default UserPhoto
