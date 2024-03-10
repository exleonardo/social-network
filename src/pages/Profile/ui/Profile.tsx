import { Redirect, useParams } from 'react-router-dom'

import { Preloader } from '@/features/Preloader/ui/Preloader'
import { useProfile } from '@/pages/Profile/hooks/useProfile'
import { ProfileInfo } from '@/widgets/Profile-info'
import { UserPostContainer } from '@/widgets/User-post-container/ui/UserPostContainer'

import s from '../style/index.module.scss'

export const Profile = () => {
  const { userId } = useParams() as { userId: string }
  const { isAuth, isFetching, profile } = useProfile(userId)

  if (!isAuth) {
    return <Redirect to={'/unautorized'} />
  }

  if (isFetching && !profile) {
    return <Preloader content fullscreen={false} position={'absolute'} />
  }

  return (
    <div className={s.profile}>
      <ProfileInfo />
      <UserPostContainer />
    </div>
  )
}
