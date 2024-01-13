import { memo, useState } from 'react'

import { getStatus } from '@/components/Chat/chat-selector'
import { sendMessage } from '@/redux/chat-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { Button } from 'antd'

export const AddMessage = memo(() => {
  const [message, setMessage] = useState('')

  const dispatch = useAppDispatch()
  const status = useAppSelector(getStatus)

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  return (
    <div>
      <div>
        <textarea
          onChange={e => {
            setMessage(e.currentTarget.value)
          }}
          value={message}
        ></textarea>
      </div>
      <div>
        <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>
          send
        </Button>
      </div>
    </div>
  )
})
