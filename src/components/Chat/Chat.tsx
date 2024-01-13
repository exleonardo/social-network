import { memo, useEffect } from 'react'

import { AddMessage } from '@/components/Chat/AddMessage'
import { Messages } from '@/components/Chat/Messages'
import { getStatus } from '@/components/Chat/chat-selector'
import { startMessageListening, stopMessageListening } from '@/redux/chat-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'

export const Chat = memo(() => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(getStatus)

  useEffect(() => {
    dispatch(startMessageListening())

    return () => {
      dispatch(stopMessageListening())
    }
  }, [status])

  return (
    <div>
      {status === 'error' ? <div>Some error occurred. Please refresh page</div> : <></>}
      <Messages />
      <AddMessage />
    </div>
  )
})
