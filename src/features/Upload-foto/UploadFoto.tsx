import { instance, setting } from '@/API/api'
import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getCurrentUserId } from '@/components/auth-selectors'
import { getProfile } from '@/components/profile-selector'
import { getUserProfile } from '@/redux/profile-reducer'
import { Upload, UploadProps, message } from 'antd'

type UploadFotoType = {
  className?: string
}
export const UploadFoto = ({ className }: UploadFotoType) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(getProfile)?.userId
  const authorizedUserId = useAppSelector(getCurrentUserId)
  const props: UploadProps = {
    onChange: info => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        if (userId) {
          dispatch(getUserProfile(userId))
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    authorizedUserId === userId && (
      <Upload
        headers={setting.headers}
        showUploadList={false}
        style={{ display: 'block' }}
        withCredentials
        {...props}
        action={`${instance.defaults.baseURL}/profile/photo`}
      >
        <button className={className}>Upload Photo</button>
      </Upload>
    )
  )
}
