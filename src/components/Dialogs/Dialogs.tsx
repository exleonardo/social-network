import React , {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";


const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage

    const dialogsElements = state.dialogs.map ( (el , index) => <DialogItem key={index} name={el.name} id={el.id}/> )

    const messagesElements = state.messages.map ( (el , index) => <Message key={index} message={el.message}
                                                                           id={el.id}/> )
    const newMessageBody = state.newMessageBody;
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody ( e )
    }
    const onSendMessageClick = () => {
        props.sendMessage ()
    }
    if ( !props.isAuth ) return <Redirect to={'/login'}/>
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea onChange={onNewMessageChange} value={newMessageBody}
                                   placeholder={'Enter message'}/>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;