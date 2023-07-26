import s from "../Dialogs.module.css";
import React from "react";


type MessageType = {
  message: string
  id: string
}
export const Message = (props: MessageType) => {
  return <div className={ s.message }>{ props.message }</div>
}