import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { getStatus, getUserProfile } from '@/redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'

import Profile from './Profile'
import { getAuthorizedUserId } from './profile-selector'

const ProfileMain = ({
  history,
  match: {
    params: { userId: userID },
  },
}: RouteComponentProps<PathParamsType>) => {
  const dispatch = useAppDispatch()
  const authorizedUserId = useAppSelector(getAuthorizedUserId)

  const refreshProfile = () => {
    let userId = userID

    if (!userId) {
      userId = !userId ? '29819' : String(authorizedUserId)
      if (!userId) {
        history.push('/login')
      }
    }
    if (!userId) {
      console.error('ID should exist in URI params or in state (authorizedUserId)')
    }
    dispatch(getUserProfile(userId))
    dispatch(getStatus(userId))
  }

  useEffect(() => {
    refreshProfile()
  }, [userID, authorizedUserId])

  return (
    <div>
      <Profile isOwner={!userID} />
    </div>
  )
}

export default ProfileMain

// //types

type PathParamsType = {
  userId: string
}
