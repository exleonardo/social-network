import { useAppSelector } from '@/app/store/redux-store'
import { ErrorTitle } from '@/entities/Error-title/ErrorTitle'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'
import { Input } from 'antd'
import { FormikValues } from 'formik'

import s from '../style/index.module.scss'

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
