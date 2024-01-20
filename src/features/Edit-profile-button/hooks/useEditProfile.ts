import { useAppSelector } from '@/app/store/redux-store'
import { getCurrentUserId } from '@/pages/Login/selectors/auth-selectors'
import { getEditProfile, getProfile } from '@/pages/Profile/selectors/profile-selector'

export const useEditProfile = () => {
  const profile = useAppSelector(getProfile)
  const authorizedUserId = useAppSelector(getCurrentUserId)
  const editProfile = useAppSelector(getEditProfile)

  return { authorizedUserId, editProfile, profile }
}
