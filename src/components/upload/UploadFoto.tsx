import { Response } from '@/API/api'
import { ProfilePhotos } from '@/API/profile-api'
import { getProfile } from '@/components/Profile/profile-selector'
import Preloader from '@/components/common/Preloader/Preloader'
import { getUserProfile } from '@/redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadProps, message } from 'antd'
import axios, { isAxiosError } from 'axios'

export const UploadFoto = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(getProfile)

  if (!profile) {
    return <Preloader fullscreen />
  }
  const props: UploadProps = {
    action: 'https://social-network.samuraijs.com/api/1.0/profile/photo',
    beforeUpload: async file => {
      const formData = new FormData()

      formData.append('image', file)
      try {
        await axios.put<Response<ProfilePhotos>>(
          'https://social-network.samuraijs.com/api/1.0/profile/photo',
          formData,
          {
            headers: {
              'API-KEY': 'f3eb22c4-26f8-436d-a4bb-37315a600abf',
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        )

        await dispatch(getUserProfile(profile.userId))
        message.success(`file uploaded successfully`)
      } catch (e) {
        if (isAxiosError(e)) {
          message.error(`${e.message} file upload failed.`)
        }
      }
    },
    headers: {
      'API-KEY': 'f3eb22c4-26f8-436d-a4bb-37315a600abf',
    },
    method: 'put',
    type: 'select',
    withCredentials: true,
  }

  return (
    <Upload showUploadList={false} {...props}>
      <Button icon={<UploadOutlined />}>Update Image</Button>
    </Upload>
  )
}
