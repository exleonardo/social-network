import { memo, useState } from 'react'

import { useAppDispatch } from '@/app/store/redux-store'
import { sendMessage } from '@/redux/chat-reducer'
import { Button } from '@/shared/Button/ui/Button'
import { Input } from '@/shared/Input/ui/Input'
import { useMessage } from '@/widgets/Add-message-chat/hooks/useMessage'

import s from '../style/index.module.scss'

export const AddMessage = memo(() => {
  const [message, setMessage] = useState('')
  const { status } = useMessage()
  const dispatch = useAppDispatch()

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  return (
    <div className={s.addMessageContainer}>
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
