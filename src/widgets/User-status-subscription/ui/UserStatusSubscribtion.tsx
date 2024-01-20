import { UsersInfoType } from '@/API/profile-api'
import { Follow } from '@/features/Follow/ui/Follow'
import { Unfollow } from '@/features/Unfollow/ui/Unfollow'
import { UserAvatar } from '@/features/User-avatar/ui/UserAvatar'
import { UserTitle } from '@/features/User-title/ui/UserTitle'
import { useStatusSubscribtion } from '@/widgets/User-status-subscription/hooks/useStatusSubscribtion'
import { List } from 'antd'

type UserStatusSubscriptionType = {
  user: UsersInfoType
}
export const UserStatusSubscribtion = ({ user }: UserStatusSubscriptionType) => {
  const { moveToProfile } = useStatusSubscribtion(user.id)

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
