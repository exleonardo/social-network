import React , {ChangeEvent} from 'react';
import {sendMessageCreator , updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {StoreReduxType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";


type DialogsPropsType = {
    store: StoreReduxType
}
const DialogsContainer = (props: DialogsPropsType) => {
    const state = props.store.getState().dialogsPage

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.store.dispatch ( updateNewMessageBodyCreator ( e.currentTarget.value ) )
    }
    const onSendMessageClick = () => {
        props.store.dispatch ( sendMessageCreator () )
    }
    return (
        <Dialogs dialogsPage={state} updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}/>
    );
};

export default DialogsContainer;