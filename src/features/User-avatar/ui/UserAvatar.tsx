import { NavLink } from 'react-router-dom'

import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
type UserAvatarType = {
  className?: string
  moveToProfile: () => void
  userPhoto: null | string
}
export const UserAvatar = ({ className, moveToProfile, userPhoto }: UserAvatarType) => {
  return (
    <NavLink onClick={moveToProfile} to={{}}>
      <Avatar className={className} icon={<UserOutlined />} src={userPhoto} />
    </NavLink>
  )
}
