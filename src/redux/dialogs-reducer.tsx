import {ActionType , DialogsPageType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        { id: '1' , name: 'Dimych' } ,
        { id: '2' , name: 'Andrey' } ,
        { id: '3' , name: 'Svaeta' } ,
        { id: '4' , name: 'Victor' } ,
        { id: '5' , name: 'Valera' }
    ] ,
    messages: [
        { id: '1' , message: 'Hi' } ,
        { id: '2' , message: 'How is you it-camasutra' } ,
        { id: '3' , message: 'yo' }
    ] ,
    newMessageBody: ''
} as DialogsPageType
export type InitialStateType = typeof initialState
const dialogsReducer = (state: InitialStateType = initialState , action: ActionType): InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return { ...state , newMessageBody: action.body }
        case SEND_MESSAGE:
            let body = state.newMessageBody
            let newMessage = { id: '4' , message: body }
            return { ...state , messages: [...state.messages , newMessage] , newMessageBody: "" }
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