import { memo } from 'react'

import { ChatMessage } from '@/API/chat-api'

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
