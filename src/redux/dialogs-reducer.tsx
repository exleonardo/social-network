import {ActionType , DialogsPageType} from "./state";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE'


const dialogsReducer = (state: DialogsPageType , action: ActionType): DialogsPageType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody
            let newMessage = { id: '4' , message: body }
            state.messages.push ( newMessage )
            state.newMessageBody = ''
            return state
        default:
            return state
    }

};
export default dialogsReducer;

export const sendMessageCreator = () => ({
    type: SEND_MESSAGE
} as const)
export const updateNewMessageBodyCreator = (text: string) => ({
    type: UPDATE_NEW_MESSAGE_BODY , body: text
} as const)