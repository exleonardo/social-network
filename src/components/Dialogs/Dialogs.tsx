import { Redirect } from 'react-router-dom'

import s from './dialogs.module.scss'

import { sendMessageCreator } from '../../redux/dialogs-reducer'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store'
import { getIsAuth } from '../Login/login-selectors'
import AddMessageFormRedux, { FormDataMessageType } from './AddMessageForm/AddMessageForm'
import { DialogItem } from './DialogsItem/DialogsItem'
import { Message } from './Message/Message'
import { getDialogMessages, getDialogsPage } from './dialog-selectors'

const Dialogs = () => {
  const initialized = useAppSelector(getIsAuth)

  const dialogsPage = useAppSelector(getDialogsPage)
  const dialogsMessages = useAppSelector(getDialogMessages)
  const dispatch = useAppDispatch()

  if (!initialized) {
    return <Redirect to={'/unautorized'} />
  }

  const sendMessage = (newMessageBody: string) => {
    dispatch(sendMessageCreator(newMessageBody))
  }

  const dialogsElements = dialogsPage.map((el, index) => (
    <DialogItem id={el.id} key={index} name={el.name} />
  ))

  const messagesElements = dialogsMessages.map((el, index) => (
    <Message id={el.id} key={index} message={el.message} />
  ))
  const addNewMessage = (values: FormDataMessageType) => {
    sendMessage(values.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  )
}

export default Dialogs

//types
