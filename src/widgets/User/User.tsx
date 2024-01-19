import { memo } from 'react'

import { UsersInfoType } from '@/API/profile-api'
import { useAppSelector } from '@/app/redux-store'
import { getIsFetching } from '@/components/users-selectors'
import Preloader from '@/features/Preloader/Preloader'
import { UserStatusSubscription } from '@/widgets/User-status-subscription/UserStatusSubscription'
import { List } from 'antd'

import s from './user.module.scss'

type UserTypeProps = {
  user: UsersInfoType
}
export const User = memo(({ user }: UserTypeProps) => {
  const isFetching = useAppSelector(getIsFetching)

  if (isFetching) {
    return <Preloader content fullscreen={false} position={'absolute'} />
  }

  return (
    <div className={s.user}>
      <List
        dataSource={[{}]}
        itemLayout={'horizontal'}
        renderItem={() => <UserStatusSubscription user={user} />}
      />
    </div>
  )
})
