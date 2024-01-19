import { memo, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getStatus } from '@/pages/Chat/selectors/chat-selector'
import { getIsAuth } from '@/pages/Login/selectors/auth-selectors'
import { startMessageListening, stopMessageListening } from '@/redux/chat-reducer'
import { AddMessage } from '@/widgets/Add-message-chat'
import { ChatMessages } from '@/widgets/Chat-messages/ui/ChatMessages'

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
