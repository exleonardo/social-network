import { useAppDispatch } from '@/app/store/redux-store'
import { useEditProfile } from '@/features/Edit-profile-button/hooks/useEditProfile'
import { setEditProfile } from '@/redux/profile-reducer'
import { Button } from '@/shared/Button'

type EditProfileButtonType = {
  className?: string
}
export const EditProfileButton = ({ className }: EditProfileButtonType) => {
  const { authorizedUserId, editProfile, profile } = useEditProfile()
  const dispatch = useAppDispatch()

  const goToEditMode = () => {
    dispatch(setEditProfile(!editProfile))
  }

  return (
    authorizedUserId === profile?.userId && (
      <Button className={className} onClick={goToEditMode}>
        Edit
      </Button>
    )
  )
}
