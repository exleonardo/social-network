import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { getCurrentUserId } from '@/components/Login/login-selectors'
import Preloader from '@/components/common/Preloader/Preloader'
import { getStatus, getUserProfile } from '@/redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'

import Profile from './Profile'

const ProfileMain = () => {
  const dispatch = useAppDispatch()
  const authorizedUserId = useAppSelector(getCurrentUserId)

  const history = useHistory()
  let { userId } = useParams() as { userId: string }

  const userID = userId

  const refreshProfile = () => {
    if (!userId) {
      userId = String(authorizedUserId)
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
  if (!authorizedUserId) {
    return <Preloader />
  }

  return (
    <div>
      <Profile isOwner={!userID} />
    </div>
  )
}

export default ProfileMain

// //types

// type PathParamsType = {
//   userId: string
// }
