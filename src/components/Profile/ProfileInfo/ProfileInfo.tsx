import { ChangeEvent, useState } from 'react'

import { ProfileUserType, UsersContactType } from '@/API/profile-api'
import { savePhoto, saveProfile } from '@/redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { Button } from 'antd'

import s from './profileInfo.module.scss'

import userPhoto from '../../../assets/images/yoda_star_wars_icon_131348.png'
import Preloader from '../../common/Preloader/Preloader'
import { Contact } from '../Contact/Contact'
import { getProfile } from '../profile-selector'
import ProfileDataFormReduxForm, { ProfileDataFormType } from './ProfileDataFormType'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

type ProfileInfoType = {
  isOwner: boolean
}
const ProfileInfo = ({ isOwner }: ProfileInfoType) => {
  const [editMode, setEditMode] = useState(false)
  const profile = useAppSelector(getProfile)

  const dispatch = useAppDispatch()

  if (!profile) {
    return <Preloader />
  }

  const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      dispatch(savePhoto(e.target.files[0]))
    }
  }
  const onSubmit = (formData: ProfileDataFormType) => {
    dispatch(saveProfile(formData))
      .then(() => setEditMode(false))
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img alt={''} src={profile.photos.large || userPhoto} />
        {isOwner && <input onChange={mainPhotoSelected} type={'file'} />}
        {editMode ? (
          <ProfileDataFormReduxForm
            editMode={editMode}
            goToEditMode={() => setEditMode(!editMode)}
            initialValues={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(!editMode)
            }}
            isOwner={isOwner}
            profile={profile}
          />
        )}

        <ProfileStatusWithHooks />
      </div>
    </div>
  )
}

export default ProfileInfo

type ProfileDataType = {
  goToEditMode: () => void
  isOwner: boolean
  profile: ProfileUserType
}
const ProfileData = ({ goToEditMode, isOwner, profile }: ProfileDataType) => {
  return (
    <div>
      {isOwner && (
        <div>
          <Button onClick={goToEditMode}>Edit</Button>
        </div>
      )}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job </b> {profile.lookingForAJob ? 'Yes' : 'No'}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professionals skills </b>
          {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me </b>
        {profile.aboutMe}
      </div>
      <div>
        <b>
          Contacts:
          {Object.keys(profile.contacts).map(el => {
            return (
              <Contact
                contactTitle={el}
                contactValue={profile.contacts[el as keyof UsersContactType]}
                key={el}
              />
            )
          })}
        </b>
      </div>
    </div>
  )
}
