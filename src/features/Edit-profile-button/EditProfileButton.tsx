import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getCurrentUserId } from '@/components/auth-selectors'
import { getEditProfile, getProfile } from '@/components/profile-selector'
import { setEditProfile } from '@/redux/profile-reducer'

type EditProfileButtonType = {
  className?: string
}
export const EditProfileButton = ({ className }: EditProfileButtonType) => {
  const profile = useAppSelector(getProfile)
  const authorizedUserId = useAppSelector(getCurrentUserId)
  const dispatch = useAppDispatch()
  const editProfile = useAppSelector(getEditProfile)
  const goToEditMode = () => {
    dispatch(setEditProfile(!editProfile))
  }

  return (
    authorizedUserId === profile?.userId && (
      <button className={className} onClick={goToEditMode}>
        Edit
      </button>
    )
  )
}
