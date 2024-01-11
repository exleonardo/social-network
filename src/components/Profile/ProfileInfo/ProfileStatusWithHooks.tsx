import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { EditOutlined } from '@ant-design/icons'
import { Button, Input, message } from 'antd'

import { updateStatus } from '../../../redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../../redux/redux-store'
import { getCurrentUserId } from '../../Login/login-selectors'
import { getUsersId } from '../../Users/users-selectors'
import { getStatusProfile } from '../profile-selector'

const ProfileStatusWithHooks = memo(() => {
  const statusProfile = useAppSelector(getStatusProfile)
  const dispatch = useAppDispatch()
  const [state, setState] = useState(false)
  const [status, setStatus] = useState(statusProfile)
  const [messageApi, contextHolder] = message.useMessage()
  const location = useLocation()

  const userId = useAppSelector(getUsersId)
  const currentUserId = useAppSelector(getCurrentUserId)

  console.log(userId)
  console.log(currentUserId)

  const error = (message: string) => {
    messageApi.open({
      content: `${message}`,
      type: 'error',
    })
  }

  useEffect(() => {
    setStatus(statusProfile)
  }, [statusProfile])

  const activateEditMode = () => {
    setState(!state)
    dispatch(updateStatus(status)).catch(err => {
      error(err)
    })
  }
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 300) {
      setStatus(e.currentTarget.value)
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {contextHolder}
      {!state && (
        <div>
          <b>Status:</b> <span>{statusProfile || 'Enter status'}</span>
          {userId === currentUserId && (
            <Button icon={<EditOutlined rev={undefined} />} onClick={activateEditMode}></Button>
          )}
        </div>
      )}
      {state && (
        <div>
          <Input
            autoFocus
            maxLength={300}
            onBlur={activateEditMode}
            onChange={onStatusChange}
            showCount
            value={status}
          />
        </div>
      )}
    </div>
  )
})

export default ProfileStatusWithHooks
