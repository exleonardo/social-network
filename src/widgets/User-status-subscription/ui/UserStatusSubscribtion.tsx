import { useHistory } from 'react-router-dom'

import { UsersInfoType } from '@/API/profile-api'
import { useAppDispatch } from '@/app/store/redux-store'
import { Follow } from '@/features/Follow/ui/Follow'
import { Unfollow } from '@/features/Unfollow/Unfollow'
import { UserAvatar } from '@/features/User-avatar/UserAvatar'
import { UserTitle } from '@/features/User-title/ui/UserTitle'
import { clearUserProfile } from '@/redux/profile-reducer'
import { toggleIsFetching } from '@/redux/users-reducer'
import { List } from 'antd'

type UserStatusSubscriptionType = {
  user: UsersInfoType
}
export const UserStatusSubscribtion = ({ user }: UserStatusSubscriptionType) => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const moveToProfile = () => {
    dispatch(toggleIsFetching(true))
    dispatch(clearUserProfile())
    history.push(`profile/${user.id}`)
  }

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<UserAvatar moveToProfile={moveToProfile} userPhoto={user.photos.small} />}
        description={user.status}
        title={<UserTitle moveToProfile={moveToProfile} userName={user.name} />}
      />
      {user.followed ? <Follow userId={user.id} /> : <Unfollow userId={user.id} />}
    </List.Item>
  )
}
