import { ErrorTitle } from '@/entities/Error-title/ui/ErrorTitle'
import { Checkbox, Input } from 'antd'
import { FormikValues } from 'formik'

type AboutMeType = {
  formik: FormikValues
}
export const ProfileFormAboutMe = ({ formik }: AboutMeType) => {
  return (
    <>
      <b>Full name</b>:
      <Input
        maxLength={25}
        showCount
        status={formik.errors.fullName && 'error'}
        {...formik.getFieldProps('fullName')}
      />
      {formik.errors.fullName && <ErrorTitle title={formik.errors.fullName} />}
      <b>Looking for a job </b>:{' '}
      <Checkbox
        checked={formik.values.lookingForAJob}
        {...formik.getFieldProps('lookingForAJob')}
      ></Checkbox>
      <div>
        <b>My professionals skills</b>:
        <Input
          maxLength={30}
          showCount
          status={formik.errors.lookingForAJobDescription && 'error'}
          {...formik.getFieldProps('lookingForAJobDescription')}
        />
        {formik.errors.lookingForAJobDescription && (
          <ErrorTitle title={formik.errors.lookingForAJobDescription} />
        )}
      </div>
      <b>About me</b>:{' '}
      <Input
        maxLength={50}
        showCount
        status={formik.errors.aboutMe && 'error'}
        {...formik.getFieldProps('aboutMe')}
      />
      {formik.errors.aboutMe && <ErrorTitle title={formik.errors.aboutMe} />}
    </>
  )
}
