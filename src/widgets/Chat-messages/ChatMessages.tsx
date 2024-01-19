import { memo, useEffect, useRef, useState } from 'react'

import { useAppSelector } from '@/app/redux-store'
import { getMessages } from '@/components/chat-selector'
import { ChatMessage } from '@/widgets/Chat-message/ChatMessage'

import s from './chat-messages.module.scss'
export const ChatMessages = memo(() => {
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

    return () => {}
  }, [isAutoScroll, messages])

  return (
    <div className={s.chatMessages} onScroll={scrollHandler}>
      {messages.map((m, index) => {
        return (
          <ChatMessage
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
})
