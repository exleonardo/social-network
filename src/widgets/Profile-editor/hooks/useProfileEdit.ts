import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getEditProfile } from '@/pages/Profile/selectors/profile-selector'
import { setEditProfile } from '@/redux/profile-reducer'

export const useProfileEdit = () => {
  const editProfile = useAppSelector(getEditProfile)
  const dispatch = useAppDispatch()
  const goToEditMode = () => {
    dispatch(setEditProfile(!editProfile))
  }

  return { editProfile, goToEditMode }
}
