import { useProfileEdit } from '@/widgets/Profile-editor/hooks/useProfileEdit'
import { ProfileForm } from '@/widgets/Profile-form/ui/ProfileForm'
import { Modal } from 'antd'

export const ProfileEditor = () => {
  const { editProfile, goToEditMode } = useProfileEdit()

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
