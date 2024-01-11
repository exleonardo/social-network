import { memo, useEffect, useRef, useState } from 'react'

import { ChatMessage } from '@/API/chat-api'
import { sendMessage, startMessageListening, stopMessageListening } from '@/redux/chat-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { Button } from 'antd'

import { getMessages, getStatus } from './chat-selector'

export const ChatPage = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

export const Chat = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(getStatus)

  useEffect(() => {
    dispatch(startMessageListening())

    return () => {
      dispatch(stopMessageListening())
    }
  }, [])

  return (
    <div>
      {status === 'error' ? <div>Some error occurred. Please refresh page</div> : <></>}
      <Messages />
      <AddMessage />
    </div>
  )
}

export const Messages = () => {
  const messages = useAppSelector(getMessages)
  const messagesAmchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget

    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 350) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAmchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div onScroll={scrollHandler} style={{ height: '400px', overflowY: 'auto' }}>
      {messages.map((m, index) => {
        return (
          <Message
            key={index}
            message={m.message}
            photo={m.photo}
            userId={m.userId}
            userName={m.userName}
          />
        )
      })}
      <div ref={messagesAmchorRef}></div>
    </div>
  )
}
export const AddMessage = () => {
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
}

export const Message = memo(({ message, photo, userName }: ChatMessage) => {
  return (
    <div>
      <img alt={'ava'} src={photo} style={{ width: '50px' }} />
      <b>{userName}</b>
      <br />
      {message}
      <hr />
    </div>
  )
})
