import { useAppSelector } from '@/app/redux-store'
import { getProfile } from '@/components/profile-selector'
import { ErrorTitle } from '@/entities/Error-title/ErrorTitle'
import { Input } from 'antd'
import { FormikValues } from 'formik'

import s from './profile-form-contacts.module.scss'

type ContactsType = {
  formik: FormikValues
}
export const ProfileFormContacts = ({ formik }: ContactsType) => {
  const profile = useAppSelector(getProfile)

  if (!profile) {
    return
  }
  const contacts = Object.keys(profile.contacts)

  return (
    <div>
      <div className={s.contactTitle}>Contacts:</div>
      {contacts.map(el => {
        return (
          <div key={el}>
            <b>{el}</b>
            <Input status={formik.errors[el] && 'error'} {...formik.getFieldProps(el)} />
            {formik.errors[el] && <ErrorTitle title={formik.errors[el]} />}
          </div>
        )
      })}
    </div>
  )
}
