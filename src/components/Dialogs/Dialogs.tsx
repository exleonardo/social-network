import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import AddMessageFormRedux , {FormDataMessageType} from "./AddMessageForm/AddMessageForm";
import {Redirect} from "react-router-dom";
import {useAppDispatch , useAppSelector} from "../../redux/redux-store";
import {getIsAuth} from "../Login/login-selectors";
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import {getDialogMessages , getDialogsPage} from "./dialog-selectors";


const Dialogs = () => {
  const initialized = useAppSelector ( getIsAuth )

  const dialogsPage = useAppSelector ( getDialogsPage )
  const dialogsMessages = useAppSelector ( getDialogMessages )
  const dispatch = useAppDispatch ()


  if ( !initialized ) {
    return <Redirect to={'/unautorized'}/>
  }


  const sendMessage = (newMessageBody: string) => {
    dispatch ( sendMessageCreator ( newMessageBody ) )
  }


  const dialogsElements = dialogsPage.map ( (el , index) => <DialogItem key={index} name={el.name} id={el.id}/> )

  const messagesElements = dialogsMessages.map ( (el , index) => <Message key={index} message={el.message}
                                                                          id={el.id}/> )
  const addNewMessage = (values: FormDataMessageType) => {
    sendMessage ( values.newMessageBody )
  }
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  );
};


export default Dialogs;

//types
