import React from 'react'

import s from '../dialogs.module.scss'

type MessageType = {
  id: string
  message: string
}
export const Message = (props: MessageType) => {
  return <div className={s.message}>{props.message}</div>
}
