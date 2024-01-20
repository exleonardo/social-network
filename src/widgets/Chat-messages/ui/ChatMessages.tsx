import { memo } from 'react'

import { ChatMessage } from '@/widgets/Chat-message/ui/ChatMessage'
import { useChatMessages } from '@/widgets/Chat-messages/hooks/useChatMessages'

import s from '../style/index.module.scss'

export const ChatMessages = memo(() => {
  const { messages, messagesAmchorRef, scrollHandler } = useChatMessages()

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
