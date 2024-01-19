import { memo } from 'react'

import { ChatMessageType } from '@/API/chat-api'
import { useAppSelector } from '@/app/store/redux-store'
import { MessageReceive } from '@/features/Chat-message-receive/ui/MessageReceive'
import { MessageSend } from '@/features/chat-message-send/ui/MessageSend'
import { getProfile } from '@/pages/Profile/selectors/profile-selector'

import s from '../styles/index.module.scss'

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
