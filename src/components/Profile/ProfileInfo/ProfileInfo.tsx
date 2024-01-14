import { useState } from 'react'

import { ProfileData } from '@/components/Profile/ProfileInfo/ProfileData'
import { getIsFetching } from '@/components/Users/users-selectors'
import { UploadFoto } from '@/components/upload/UploadFoto'
import { useAppSelector } from '@/redux/redux-store'
import { Modal } from 'antd'

import s from './profileInfo.module.scss'

import userPhoto from '../../../assets/images/yoda_star_wars_icon_131348.png'
import Preloader from '../../common/Preloader/Preloader'
import { getProfile } from '../profile-selector'
import ProfileDataForm from './ProfileDataFormType'
import ProfileStatus from './ProfileStatus'

type ProfileInfoType = {
  isOwner: boolean
}
export const ProfileInfo = ({ isOwner }: ProfileInfoType) => {
  const [editMode, setEditMode] = useState(false)
  const profile = useAppSelector(getProfile)
  const isFetching = useAppSelector(getIsFetching)

  if (isFetching || !profile) {
    return <Preloader fullscreen={false} />
  }

  const goToEditMode = () => {
    setEditMode(!editMode)
  }

  return (
    <>
      <div className={s.descriptionBlock}>
        <img alt={''} src={profile?.photos.large || userPhoto} style={{ borderRadius: '50%' }} />
        {isOwner && <UploadFoto />}
        <ProfileStatus />
        <ProfileData goToEditMode={goToEditMode} isOwner={isOwner} profile={profile} />
        <Modal
          centered
          footer={null}
          okText={'Save'}
          onCancel={() => setEditMode(!editMode)}
          open={editMode}
          title={'About Me'}
        >
          <ProfileDataForm goToEditMode={setEditMode} />
        </Modal>
      </div>
    </>
  )
}
