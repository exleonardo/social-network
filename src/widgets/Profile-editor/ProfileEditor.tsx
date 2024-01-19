import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getEditProfile } from '@/components/profile-selector'
import { setEditProfile } from '@/redux/profile-reducer'
import ProfileForm from '@/widgets/Profile-form/ProfileForm'
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
