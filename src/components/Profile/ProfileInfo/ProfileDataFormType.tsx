import { memo } from 'react'

import { getProfile } from '@/components/Profile/profile-selector'
import { saveProfile } from '@/redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { Button, Checkbox, Input } from 'antd'
import { useFormik } from 'formik'

type ProfileDataFormType = {
  goToEditMode: (value: boolean) => void
}

const ProfileDataForm = memo(({ goToEditMode }: ProfileDataFormType) => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(getProfile)

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
      <div>
        <b>Full name</b>:
        <Input
          maxLength={25}
          showCount
          status={formik.errors.fullName && 'error'}
          {...formik.getFieldProps('fullName')}
        />
        {formik.errors.fullName && <div style={{ color: 'red' }}>{formik.errors.fullName}</div>}
      </div>
      <div>
        <b>Looking for a job </b>:{' '}
        <Checkbox
          checked={formik.values.lookingForAJob}
          {...formik.getFieldProps('lookingForAJob')}
        ></Checkbox>
      </div>

      <div>
        <b>My professionals skills</b>:
        <Input
          maxLength={30}
          showCount
          status={formik.errors.lookingForAJobDescription && 'error'}
          {...formik.getFieldProps('lookingForAJobDescription')}
        />
        {formik.errors.lookingForAJobDescription ? (
          <div style={{ color: 'red' }}>{formik.errors.lookingForAJobDescription}</div>
        ) : null}
      </div>
      <div>
        <b>About me</b>:{' '}
        <Input
          maxLength={50}
          showCount
          status={formik.errors.aboutMe && 'error'}
          {...formik.getFieldProps('aboutMe')}
        />
        {formik.errors.aboutMe ? <div style={{ color: 'red' }}>{formik.errors.aboutMe}</div> : null}
      </div>
      <div>
        <b>
          <b style={{ display: 'flex', justifyContent: 'center' }}>Contacts:</b>
          <div className={'s.contact'}>
            facebook:{' '}
            <Input
              status={formik.errors.facebook && 'error'}
              {...formik.getFieldProps('facebook')}
            />
            {formik.errors.facebook && <div style={{ color: 'red' }}>{formik.errors.facebook}</div>}
          </div>
          <div>
            github:{' '}
            <Input status={formik.errors.github && 'error'} {...formik.getFieldProps('github')} />
            {formik.errors.github && <div style={{ color: 'red' }}>{formik.errors.github}</div>}
          </div>
          <div>
            instagram:
            <Input
              status={formik.errors.instagram && 'error'}
              {...formik.getFieldProps('instagram')}
            />
            {formik.errors.instagram && (
              <div style={{ color: 'red' }}>{formik.errors.instagram}</div>
            )}
          </div>
          <div>
            mainLink:
            <Input
              status={formik.errors.mainLink && 'error'}
              {...formik.getFieldProps('mainLink')}
            />
            {formik.errors.mainLink && <div style={{ color: 'red' }}>{formik.errors.mainLink}</div>}
          </div>
          <div>
            twitter:
            <Input status={formik.errors.twitter && 'error'} {...formik.getFieldProps('twitter')} />
            {formik.errors.twitter && <div style={{ color: 'red' }}>{formik.errors.twitter}</div>}
          </div>
          <div>
            vk:
            <Input status={formik.errors.vk && 'error'} {...formik.getFieldProps('vk')} />
            {formik.errors.vk && <div style={{ color: 'red' }}>{formik.errors.vk}</div>}
          </div>
          <div>
            website:
            <Input status={formik.errors.website && 'error'} {...formik.getFieldProps('website')} />
            {formik.errors.website && <div style={{ color: 'red' }}>{formik.errors.website}</div>}
          </div>
          <div>
            youtube:
            <Input status={formik.errors.youtube && 'error'} {...formik.getFieldProps('youtube')} />
            {formik.errors.youtube && <div style={{ color: 'red' }}>{formik.errors.youtube}</div>}
          </div>
        </b>
      </div>
      <Button htmlType={'submit'} loading={formik.isSubmitting}>
        Save
      </Button>
    </form>
  )
})

export default ProfileDataForm
