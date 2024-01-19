import { memo } from 'react'

import { UsersInfoType } from '@/API/profile-api'
import { useAppSelector } from '@/app/store/redux-store'
import Preloader from '@/features/Preloader/Preloader'
import { getIsFetching } from '@/pages/Users/selectors/users-selectors'
import { UserStatusSubscribtion } from '@/widgets/User-status-subscription/ui/UserStatusSubscribtion'
import { List } from 'antd'

import s from '../style/index.module.scss'

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
        renderItem={() => <UserStatusSubscribtion user={user} />}
      />
    </div>
  )
})
