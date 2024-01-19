import { ChangeEvent, memo, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getCurrentUserId } from '@/pages/Login/selectors/auth-selectors'
import { getStatusProfile } from '@/pages/Profile/selectors/profile-selector'
import { getUsersId } from '@/pages/Users/selectors/users-selectors'
import { updateStatus } from '@/redux/profile-reducer'
import { Input, Modal, message } from 'antd'

import s from '../style/index.module.scss'
type StatusType = {
  className?: string
}
export const Status = memo(({ className }: StatusType) => {
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

  return (
    <div className={className ? className : s.status} onClick={cancel}>
      {contextHolder}
      {
        <div className={s.statusText}>
          <span>{statusProfile ? statusProfile : 'No status'}</span>
        </div>
      }
      {userId === currentUserId && (
        <Modal centered okText={'Save'} onCancel={cancel} onOk={activateEditMode} open={state}>
          <Input
            autoFocus
            maxLength={100}
            onChange={onStatusChange}
            onClick={e => e.stopPropagation()}
            showCount
            value={status}
          />
        </Modal>
      )}
    </div>
  )
})
