import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogsPropsType} from "./DialogsContainer";
import AddMessageFormRedux , {FormDataMessageType} from "./AddMessageForm/AddMessageForm";


const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage

    const dialogsElements = state.dialogs.map ( (el , index) => <DialogItem key={index} name={el.name} id={el.id}/> )

    const messagesElements = state.messages.map ( (el , index) => <Message key={index} message={el.message}
                                                                           id={el.id}/> )
    const addNewMessage = (values: FormDataMessageType) => {
        props.sendMessage ( values.newMessageBody )
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
