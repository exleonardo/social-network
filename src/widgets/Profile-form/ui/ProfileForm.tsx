import { memo } from 'react'

import { ButtonSubmit } from '@/features/Form-submit/ui/ButtonSubmit'
import { useProfileForm } from '@/widgets/Profile-form/hooks/useProfileForm'
import { ProfileFormAboutMe } from '@/widgets/Profile-form-about-me/ui/ProfileFormAboutMe'
import { ProfileFormContacts } from '@/widgets/Profile-form-contacts/ui/ProfileFormContacts'

export const ProfileForm = memo(() => {
  const { formik } = useProfileForm()

  return (
    <form onSubmit={formik.handleSubmit}>
      <ProfileFormAboutMe formik={formik} />
      <ProfileFormContacts formik={formik} />
      <ButtonSubmit isSubmitting={formik.isSubmitting} title={'Save'} />
    </form>
  )
})
