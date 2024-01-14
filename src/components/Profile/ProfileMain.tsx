import { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { getCurrentUserId, getIsAuth } from '@/components/Login/auth-selectors'
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
  if (!isAuth) {
    return <Redirect to={'/unautorized'} />
  }

  return (
    <>
      <Profile isOwner={!userId} />
    </>
  )
}
