import React , {ChangeEvent} from 'react';
import {sendMessageCreator , updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {StoreReduxType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


type DialogsPropsType = {}
const DialogsContainer = (props: DialogsPropsType) => {

    return (
        <StoreContext.Consumer>
            {(store: StoreReduxType) => {

                const state = store.getState ().dialogsPage
                const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    store.dispatch ( updateNewMessageBodyCreator ( e.currentTarget.value ) )
                }
                const onSendMessageClick = () => {
                    store.dispatch ( sendMessageCreator () )
                }

                return <Dialogs dialogsPage={state} updateNewMessageBody={onNewMessageChange}
                                sendMessage={onSendMessageClick}/>

            }}
        </StoreContext.Consumer>);
};

export default DialogsContainer;