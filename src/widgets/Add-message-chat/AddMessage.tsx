import { memo, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getStatus } from '@/components/chat-selector'
import { sendMessage } from '@/redux/chat-reducer'
import { Button } from '@/shared/Button/Button'
import { Input } from '@/shared/Input/Input'

import s from './add-message.module.scss'
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
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <div style={{ width: '80%' }}>
        <Input
          className={s.input}
          onChange={e => {
            setMessage(e.currentTarget.value)
          }}
          value={message}
        ></Input>
      </div>
      <div>
        <Button className={s.button} disabled={status !== 'ready'} onClick={sendMessageHandler}>
          send
        </Button>
      </div>
    </div>
  )
})
