import React from "react";
import s from "./Dialogs.module.css"
import { DialogItem } from "./DialogsItem/DialogsItem";
import { Message } from "./Message/Message";


type DialogsType = { id: string, name: string }
type MessagesType = { id: string; message: string }
const Dialogs = () => {
  const dialogs: DialogsType[] = [
    {id: "1", name: "Dimych"},
    {id: "2", name: "Andrey"},
    {id: "3", name: "Svaeta"},
    {id: "4", name: "Victor"},
    {id: "5", name: "Valera"}
  ];
  const messages: MessagesType[] = [
    {id: "1", message: "Hi"},
    {id: "2", message: "How is you it-camasutra"},
    {id: "3", message: "yo"}
  ]
  const dialogsElements = dialogs.map((el) => <DialogItem name={ el.name } id={ el.id }/>)
  const messagesElements = messages.map((el) => <Message message={ el.message } id={ el.id }/>)
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