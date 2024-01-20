import { instance, setting } from '@/API/api'
import { useUploadPhoto } from '@/features/Upload/hook/useUploadPhoto'
import { Button } from '@/shared/Button'
import { Upload } from 'antd'

type UploadFotoType = {
  className?: string
}
export const UploadPhoto = ({ className }: UploadFotoType) => {
  const { authorizedUserId, props, userId } = useUploadPhoto()

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
        <Button className={className}>Upload Photo</Button>
      </Upload>
    )
  )
}
