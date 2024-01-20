import { memo, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useAppDispatch } from '@/app/store/redux-store'
import { useChat } from '@/pages/Chat/hooks/useChat'
import { startMessageListening, stopMessageListening } from '@/redux/chat-reducer'
import { AddMessage } from '@/widgets/Add-message-chat'
import { ChatMessages } from '@/widgets/Chat-messages/ui/ChatMessages'

export const Chat = memo(() => {
  const { isAuth, status } = useChat()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startMessageListening())

    return () => {
      dispatch(stopMessageListening())
    }
  }, [status])
  if (!isAuth) {
    return <Redirect to={'/unautorized'} />
  }

  return (
    <div>
      {status === 'error' ? <div>Some error occurred. Please refresh page</div> : <></>}
      <ChatMessages />
      <AddMessage />
    </div>
  )
})
