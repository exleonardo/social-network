import { memo } from 'react'

import { ChatMessageType } from '@/API/chat-api'

export const ChatMessage = memo(({ message, photo, userName }: ChatMessageType) => {
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
