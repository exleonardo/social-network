import React from "react";
import s from "../Dialogs.module.css";
import { NavLink } from "react-router-dom";


type DialogItemType = {
  name: string;
  id: string;
}
export const DialogItem = (props: DialogItemType) => {
  const {name, id} = props
  const path = `/dialogs/${ id }`
  return (
    <div className={ s.dialog }><NavLink activeClassName={ s.active } to={ path }>{ name }</NavLink></div>
  )
}

export default DialogItem;