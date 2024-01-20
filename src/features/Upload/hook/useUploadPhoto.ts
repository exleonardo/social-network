import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getCurrentUserId } from '@/pages/Login/selectors/auth-selectors'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'
import { getUserProfile } from '@/redux/profile-reducer'
import { UploadProps, message } from 'antd'

export const useUploadPhoto = () => {
  const userId = useAppSelector(getProfile)?.userId
  const authorizedUserId = useAppSelector(getCurrentUserId)
  const dispatch = useAppDispatch()
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

  return { authorizedUserId, props, userId }
}
