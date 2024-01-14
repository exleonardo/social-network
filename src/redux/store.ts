import { ProfileUserType } from '@/API/profile-api'

// export type StoreType = {
//   _callSubscriber: (state: RootStateType) => void
//   _state: RootStateType
//   dispatch: (action: ActionType) => void
//   getState: () => RootStateType
//   subscribe: (observer: (state: RootStateType) => void) => void
// }

// let store: StoreType = {
//   _callSubscriber(state: RootStateType) {},
//   _state: {
//     dialogsPage: {
//       dialogs: [
//         { id: '1', name: 'Dimych' },
//         { id: '2', name: 'Andrey' },
//         { id: '3', name: 'Svaeta' },
//         { id: '4', name: 'Victor' },
//         { id: '5', name: 'Valera' },
//       ],
//       messages: [
//         { id: '1', message: 'Hi' },
//         { id: '2', message: 'How is you it-camasutra' },
//         { id: '3', message: 'yo' },
//       ],
//       newMessageBody: '',
//     },
//     profilePage: {
//       newPostText: 'It-kamasutra.com',
//       posts: [
//         { id: 1, likesCount: '1', message: 'Hi how are you' },
//         { id: 2, likesCount: '23', message: "It's my post " },
//       ],
//       profile: null,
//       status: '',
//     },
//     sidebar: {},
//   },
//   dispatch(action) {
//     this._state.profilePage = profileReducer(this._state.profilePage, action)
//     this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//     this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//     this._callSubscriber(this._state)
//   },
//   getState() {
//     return this._state
//   },
//   subscribe(observer) {
//     this._callSubscriber = observer
//   },
// }

export type PostsType = {
  id: number
  likesCount: string
  message: string
}
export type DialogsType = { id: string; name: string }
export type MessagesType = { id: string; message: string }
export type ProfilePageType = {
  newPostText: string
  posts: PostsType[]
  profile: ProfileUserType | null
  status: string
}
export type DialogsPageType = {
  dialogs: DialogsType[]
  messages: MessagesType[]
  newMessageBody: string
}
export type SidebarType = {}
export type RootStateType = {
  dialogsPage: DialogsPageType
  profilePage: ProfilePageType
  sidebar: SidebarType
}
