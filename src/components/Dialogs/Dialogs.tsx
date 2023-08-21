import React , {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogsType , MessagesType} from '../../redux/store';
import {DialogsPropsType} from "./DialogsContainer";


const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage

    const dialogsElements = state.dialogs.map ( (el: DialogsType) => <DialogItem name={el.name} id={el.id}/> )

    const messagesElements = state.messages.map ( (el: MessagesType) => <Message message={el.message} id={el.id}/> )
    const newMessageBody = state.newMessageBody;
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody ( e )
    }
    const onSendMessageClick = () => {
        props.sendMessage ()
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea onChange={onNewMessageChange} value={newMessageBody} placeholder={'Enter message'}/>
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