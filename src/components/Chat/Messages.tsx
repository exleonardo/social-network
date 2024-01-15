import { memo, useEffect, useRef, useState } from 'react'

import { useAppSelector } from '@/app/redux-store'
import { Message } from '@/components/Chat/Message'
import { getMessages } from '@/components/Chat/chat-selector'

export const Messages = memo(() => {
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
})
