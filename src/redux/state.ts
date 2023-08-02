const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (state: RootStateType) => void;
    subscribe: (observer: (state: RootStateType) => void) => void;
    dispatch: (action: ActionType) => void
}

export type ActionType = ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPostTextCreator>

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Hi how are you', likesCount: '1'},
                {id: '2', message: 'It\'s my post ', likesCount: '23'}
            ],
            newPostText: 'It-kamasutra.com'
        },
        dialogsPage: {
            dialogs: [
                {id: '1', name: 'Dimych'},
                {id: '2', name: 'Andrey'},
                {id: '3', name: 'Svaeta'},
                {id: '4', name: 'Victor'},
                {id: '5', name: 'Valera'}
            ],
            messages: [
                {id: '1', message: 'Hi'},
                {id: '2', message: 'How is you it-camasutra'},
                {id: '3', message: 'yo'}
            ]
        },
        sidebar: {}
    },
    getState() {
        return this._state
    },
    _callSubscriber(state: RootStateType) {
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            let newPost: PostsType = {id: '5', message: this._state.profilePage.newPostText, likesCount: '5'}
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.postMessage
            this._callSubscriber(this._state)
        }
    }
}
export const addPostActionCreator = (text: string) => ({
    type: ADD_POST,
    newPostText: text
} as const)

export const updateNewPostTextCreator = (text: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    postMessage: text
} as const)


export type PostsType = {
    id: string;
    message: string;
    likesCount: string
}
export type DialogsType = { id: string, name: string }
export type MessagesType = { id: string; message: string }
export type ProfilePageType = {
    posts: PostsType[];
    newPostText: string
}
export type DialogsPageType = {
    dialogs: DialogsType[];
    messages: MessagesType[];
}
export type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType;
    dialogsPage: DialogsPageType;
    sidebar: SidebarType
}
export default store