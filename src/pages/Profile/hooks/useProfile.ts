import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getCurrentUserId, getIsAuth } from '@/pages/Login/selectors/auth-selectors'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'
import { getIsFetching } from '@/pages/Users/selectors/users-selectors'
import { getStatus, getUserProfile } from '@/redux/profile-reducer'

export const useProfile = (userId: string) => {
  const dispatch = useAppDispatch()
  const authorizedUserId = useAppSelector(getCurrentUserId)
  const isAuth = useAppSelector(getIsAuth)
  const isFetching = useAppSelector(getIsFetching)
  const profile = useAppSelector(getProfile)

  if (!userId) {
    userId = String(authorizedUserId)
  }

  const refreshProfile = () => {
    if (isAuth) {
      dispatch(getUserProfile(userId))
      dispatch(getStatus(userId))
    }
  }

  useEffect(() => {
    refreshProfile()
  }, [isAuth, userId])

  return { authorizedUserId, isAuth, isFetching, profile }
}
