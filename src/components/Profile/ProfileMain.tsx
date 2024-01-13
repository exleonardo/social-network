import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getCurrentUserId, getIsAuth } from '@/components/Login/login-selectors'
import { getStatus, getUserProfile } from '@/redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'

import Profile from './Profile'

export const ProfileMain = () => {
  const dispatch = useAppDispatch()
  const authorizedUserId = useAppSelector(getCurrentUserId)
  const isAuth = useAppSelector(getIsAuth)

  let { userId } = useParams() as { userId: string }

  const refreshProfile = () => {
    if (!userId) {
      userId = String(authorizedUserId)
    }
    if (isAuth) {
      dispatch(getUserProfile(userId))
      dispatch(getStatus(userId))
    }
  }

  useEffect(() => {
    refreshProfile()
  }, [isAuth, userId])

  return (
    <div>
      <Profile isOwner={!userId} />
    </div>
  )
}
