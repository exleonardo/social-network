import { memo, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getIsAuth } from '@/components/auth-selectors'
import { getStatus } from '@/components/chat-selector'
import { startMessageListening, stopMessageListening } from '@/redux/chat-reducer'
import { AddMessage } from '@/widgets/Add-message-chat/AddMessage'
import { ChatMessages } from '@/widgets/Chat-messages/ChatMessages'

export const Chat = memo(() => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(getStatus)
  const isAuth = useAppSelector(getIsAuth)

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
