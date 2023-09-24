import profileReducer , {addPostActionCreator , updateNewPostTextCreator} from "./profile-reducer";
import dialogsReducer , {sendMessageCreator , updateNewMessageBodyCreator} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {ProfileUserType} from "../API/socialNetworkAPI";


type ActionType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>
    | ReturnType<typeof sendMessageCreator>

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (state: RootStateType) => void;
    subscribe: (observer: (state: RootStateType) => void) => void;
    dispatch: (action: ActionType) => void
}


export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                { id: 1 , message: 'Hi how are you' , likesCount: '1' } ,
                { id: 2 , message: 'It\'s my post ' , likesCount: '23' }
            ] ,
            newPostText: 'It-kamasutra.com' ,
            profile: null
        } ,
        dialogsPage: {
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
        } ,
        sidebar: {}
    } ,
    getState() {
        return this._state
    } ,
    _callSubscriber(state: RootStateType) {
    } ,
    subscribe(observer) {
        this._callSubscriber = observer
    } ,
    dispatch(action) {
        this._state.profilePage = profileReducer ( this._state.profilePage , action )
        this._state.dialogsPage = dialogsReducer ( this._state.dialogsPage , action )
        this._state.sidebar = sidebarReducer ( this._state.sidebar , action )
        this._callSubscriber ( this._state )
    }
}

export type PostsType = {
    id: number;
    message: string;
    likesCount: string
}
export type DialogsType = { id: string, name: string }
export type MessagesType = { id: string; message: string }
export type ProfilePageType = {
    posts: PostsType[];
    newPostText: string;
    profile: null | ProfileUserType
}
export type DialogsPageType = {
    dialogs: DialogsType[];
    messages: MessagesType[];
    newMessageBody: string
}
export type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType;
    dialogsPage: DialogsPageType;
    sidebar: SidebarType
}
export default store