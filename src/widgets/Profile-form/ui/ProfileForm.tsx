import { memo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { ButtonSubmit } from '@/features/Form-submit/ui/ButtonSubmit'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'
import { saveProfile, setEditProfile } from '@/redux/profile-reducer'
import { ProfileFormAboutMe } from '@/widgets/Profile-form-about-me/ui/ProfileFormAboutMe'
import { ProfileFormContacts } from '@/widgets/Profile-form-contacts/ui/ProfileFormContacts'
import { useFormik } from 'formik'

export const ProfileForm = memo(() => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(getProfile)
  const goToEditMode = (editmode: boolean) => {
    dispatch(setEditProfile(editmode))
  }

  const formik = useFormik({
    initialValues: {
      aboutMe: profile?.aboutMe || '',
      facebook: profile?.contacts.facebook || '',
      fullName: profile?.fullName || '',
      github: profile?.contacts.github || '',
      instagram: profile?.contacts.instagram || '',
      lookingForAJob: profile?.lookingForAJob || false,
      lookingForAJobDescription: profile?.lookingForAJobDescription || '',
      mainLink: profile?.contacts.mainLink || '',
      twitter: profile?.contacts.twitter || '',
      vk: profile?.contacts.vk || '',
      website: profile?.contacts.website || '',
      youtube: profile?.contacts.youtube || '',
    },
    onSubmit: (formData, formikHelpers) => {
      const { aboutMe, fullName, lookingForAJob, lookingForAJobDescription, ...contacts } = formData
      const saveData = { aboutMe, contacts, fullName, lookingForAJob, lookingForAJobDescription }

      formikHelpers.setSubmitting(true)

      dispatch(saveProfile(saveData))
        .then(() => {
          goToEditMode(false)
        })
        .catch(error => {
          formikHelpers.setFieldError(error.field, error.message)
          goToEditMode(true)
        })
        .finally(() => {
          formikHelpers.setSubmitting(false)
        })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <ProfileFormAboutMe formik={formik} />
      <ProfileFormContacts formik={formik} />
      <ButtonSubmit isSubmitting={formik.isSubmitting} title={'Save'} />
    </form>
  )
})
