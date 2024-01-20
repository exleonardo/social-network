import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'
import { saveProfile, setEditProfile } from '@/redux/profile-reducer'
import { useFormik } from 'formik'

export const useProfileForm = () => {
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

  return { formik }
}
