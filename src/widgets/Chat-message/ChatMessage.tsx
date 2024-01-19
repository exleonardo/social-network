import { memo } from 'react'

import { ChatMessageType } from '@/API/chat-api'
import { useAppSelector } from '@/app/redux-store'
import { getProfile } from '@/components/profile-selector'
import { MessageReceive } from '@/features/Chat-message-receive/MessageReceive'
import { MessageSend } from '@/features/chat-message-send/MessageSend'

import s from './chat-message.module.scss'

export const ChatMessage = memo(({ message, photo, userName }: ChatMessageType) => {
  const profile = useAppSelector(getProfile)

  if (!profile) {
    return
  }

  return (
    <div className={s.chat}>
      <MessageSend
        fullName={profile.fullName}
        message={message}
        photo={photo}
        userName={userName}
      />
      <MessageReceive
        fullName={profile.fullName}
        message={message}
        photo={photo}
        userName={userName}
      />
    </div>
  )
})
