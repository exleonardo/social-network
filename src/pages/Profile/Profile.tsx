import { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getCurrentUserId, getIsAuth } from '@/components/auth-selectors'
import { getProfile } from '@/components/profile-selector'
import { getIsFetching } from '@/components/users-selectors'
import Preloader from '@/features/Preloader/Preloader'
import { getStatus, getUserProfile } from '@/redux/profile-reducer'
import { ProfileInfo } from '@/widgets/Profile-info/ProfileInfo'
import { UserPostContainer } from '@/widgets/User-post-container/UserPostContainer'

import s from './profile.module.scss'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const authorizedUserId = useAppSelector(getCurrentUserId)
  const isAuth = useAppSelector(getIsAuth)
  const isFetching = useAppSelector(getIsFetching)
  const profile = useAppSelector(getProfile)
  let { userId } = useParams() as { userId: string }

  const refreshProfile = () => {
    if (isAuth) {
      dispatch(getUserProfile(userId))
      dispatch(getStatus(userId))
    }
  }

  useEffect(() => {
    refreshProfile()
  }, [isAuth, userId])
  if (!userId) {
    userId = String(authorizedUserId)
  }
  if (!isAuth) {
    return <Redirect to={'/unautorized'} />
  }

  if (isFetching && !profile) {
    return <Preloader content fullscreen={false} position={'absolute'} />
  }

  return (
    <div className={s.profile} style={{ maxHeight: 'max-content' }}>
      <ProfileInfo />
      <UserPostContainer />
    </div>
  )
}
