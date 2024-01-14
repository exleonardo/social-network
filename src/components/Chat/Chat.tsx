import { memo, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { AddMessage } from '@/components/Chat/AddMessage'
import { Messages } from '@/components/Chat/Messages'
import { getStatus } from '@/components/Chat/chat-selector'
import { getIsAuth } from '@/components/Login/auth-selectors'
import { startMessageListening, stopMessageListening } from '@/redux/chat-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'

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
      <Messages />
      <AddMessage />
    </div>
  )
})
