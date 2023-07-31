import React from "react";
import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogsItem/DialogsItem";
import { Message } from "./Message/Message";
import {DialogsType, MessagesType} from '../../redux/state';



type DialogsPropsType = {
    state:{
        dialogs:DialogsType[];
        messages:MessagesType[];
    }
}
const Dialogs = (props:DialogsPropsType) => {

  const dialogsElements = props.state.dialogs.map((el) => <DialogItem name={ el.name } id={ el.id }/>)
  const messagesElements = props.state.messages.map((el) => <Message message={ el.message } id={ el.id }/>)
  return (
    <div className={ s.dialogs }>
      <div className={ s.dialogsItems }>
        { dialogsElements }
      </div>
      <div className={ s.messages }>
        { messagesElements }
      </div>
    </div>
  );
};

export default Dialogs;