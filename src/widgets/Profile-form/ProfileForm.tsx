import { memo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getProfile } from '@/components/profile-selector'
import { ButtonSubmit } from '@/features/Form-submit/ButtonSubmit'
import { saveProfile, setEditProfile } from '@/redux/profile-reducer'
import { ProfileFormAboutMe } from '@/widgets/Profile-form-about-me/ProfileFormAboutMe'
import { ProfileFormContacts } from '@/widgets/Profile-form-contacts/ProfileFormContacts'
import { useFormik } from 'formik'

const ProfileForm = memo(() => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(getProfile)
  const goToEditMode = (editmode: boolean) => {
    dispatch(setEditProfile(editmode))
  }

  if (!profile) {
    return
  }
  const formik = useFormik({
    initialValues: {
      aboutMe: profile.aboutMe,
      facebook: profile.contacts.facebook,
      fullName: profile.fullName,
      github: profile.contacts.github,
      instagram: profile.contacts.instagram,
      lookingForAJob: profile.lookingForAJob,
      lookingForAJobDescription: profile.lookingForAJobDescription,
      mainLink: profile.contacts.mainLink,
      twitter: profile.contacts.twitter,
      vk: profile.contacts.vk,
      website: profile.contacts.website,
      youtube: profile.contacts.youtube,
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

export default ProfileForm
