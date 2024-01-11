import React from 'react'

import { InjectedFormProps, reduxForm } from 'redux-form'

import s from '../../common/FormsControls/FormsControls.module.scss'

import { ProfileUserType, UsersContactType } from '../../../API/profile-api'
import { Input, Textarea, createField } from '../../common/FormsControls/FormsControls'

export type ProfilePropsFormType = {
  editMode: boolean
  goToEditMode: () => void
  initialValues: ProfileUserType
}
export type ProfileDataForm = {
  aboutMe: string
  contacts: {
    facebook: null | string
    github: null | string
    instagram: null | string
    mainLink: null | string
    twitter: null | string
    vk: null | string
    website: null | string
    youtube: null | string
  }
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
}
type ProfileFormValuesTypeKeys = keyof ProfileDataForm | keyof UsersContactType

const ProfileDataForm: React.FC<
  ProfilePropsFormType & InjectedFormProps<ProfileUserType, ProfilePropsFormType>
> = ({ error, handleSubmit, initialValues }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <b>Full name</b>:
        {createField<ProfileFormValuesTypeKeys>('Full name', 'fullName', [], Input, {
          type: 'text',
        })}
      </div>
      <div>
        <b>Looking for a job </b>:{' '}
        {createField<ProfileFormValuesTypeKeys>('', 'lookingForAJob', [], Input, {
          type: 'checkbox',
        })}
      </div>

      <div>
        <b>My professionals skills</b>:{' '}
        {createField<ProfileFormValuesTypeKeys>(
          'My professionals skills',
          'lookingForAJobDescription',
          [],
          Textarea,
          { type: 'text' }
        )}
      </div>
      <div>
        <b>About me</b>:{' '}
        {createField<ProfileFormValuesTypeKeys>('About me', 'aboutMe', [], Textarea, {
          type: 'text',
        })}
      </div>
      <div>
        <b>
          Contacts:
          {Object.keys(initialValues.contacts).map(el => {
            return (
              <div className={'s.contact'} key={el}>
                {el} : {createField(el, 'contacts.' + el, [], Input, { type: 'text' })}
              </div>
            )
          })}
        </b>
      </div>
    </form>
  )
}
const ProfileDataFormReduxForm = reduxForm<ProfileUserType, ProfilePropsFormType>({
  form: 'edit-profile',
})(ProfileDataForm)

export default ProfileDataFormReduxForm
