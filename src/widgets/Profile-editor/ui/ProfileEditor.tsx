import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getEditProfile } from '@/pages/Profile/selectors/profile-selector'
import { setEditProfile } from '@/redux/profile-reducer'
import { ProfileForm } from '@/widgets/Profile-form/ui/ProfileForm'
import { Modal } from 'antd'

export const ProfileEditor = () => {
  const editProfile = useAppSelector(getEditProfile)
  const dispatch = useAppDispatch()
  const goToEditMode = () => {
    dispatch(setEditProfile(!editProfile))
  }

  return (
    <Modal
      centered
      footer={null}
      okText={'Save'}
      onCancel={goToEditMode}
      open={editProfile}
      title={'About Me'}
    >
      <ProfileForm />
    </Modal>
  )
}
