import { instance, setting } from '@/API/api'
import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getCurrentUserId } from '@/components/Login/auth-selectors'
import { getProfile } from '@/components/Profile/profile-selector'
import { getUserProfile } from '@/redux/profile-reducer'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadProps, message } from 'antd'

export const UploadFoto = () => {
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
        withCredentials
        {...props}
        action={`${instance.defaults.baseURL}/profile/photo`}
      >
        <Button icon={<UploadOutlined />}>Update Image</Button>
      </Upload>
    )
  )
}
