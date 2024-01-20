import { ChangeEvent, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getCurrentUserId } from '@/pages/Login/selectors/auth-selectors'
import { getStatusProfile } from '@/pages/Profile/selectors/profile-selector'
import { getUsersId } from '@/pages/Users/selectors/users-selectors'
import { updateStatus } from '@/redux/profile-reducer'
import { message } from 'antd'

export const useStatus = () => {
  const statusProfile = useAppSelector(getStatusProfile)
  const dispatch = useAppDispatch()
  const [state, setState] = useState(false)
  const [status, setStatus] = useState(statusProfile)
  const [messageApi, contextHolder] = message.useMessage()

  const userId = useAppSelector(getUsersId)
  const currentUserId = useAppSelector(getCurrentUserId)

  const error = (message: string) => {
    messageApi.open({
      content: `${message}`,
      type: 'error',
    })
  }

  useEffect(() => {
    setStatus(statusProfile)
  }, [statusProfile])
  const cancel = () => {
    if (userId === currentUserId) {
      setState(!state)
    }
  }

  const activateEditMode = () => {
    dispatch(updateStatus(status))
      .then(() => {
        setState(!state)
      })
      .catch(err => {
        error(err)
      })
  }
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 300) {
      setStatus(e.currentTarget.value)
    }
  }

  return {
    activateEditMode,
    cancel,
    contextHolder,
    currentUserId,
    onStatusChange,
    state,
    status,
    statusProfile,
    userId,
  }
}
