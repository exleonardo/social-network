import {sendMessageCreator , updateNewMessageBodyCreator} from "./dialogs-reducer";
import {ProfileUserType} from "../components/API/socialNetworkAPI";
import {ProfilePageType} from "./store";

const SET_URER_PROFILE = 'SET-USER-PROFILE'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

export type ActionType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof setUserProfile>

let initialState = {
    posts: [
        { id: 1 , message: 'Hi how are you' , likesCount: '1' } ,
        { id: 2 , message: 'It\'s my post ' , likesCount: '23' }
    ] ,
    newPostText: 'It-kamasutra.com' ,
    profile: null
} as ProfilePageType
type InitialState = typeof initialState


const profileReducer = (state: InitialState = initialState , action: ActionType): InitialState => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state ,
                posts: [...state.posts , { id: 5 , message: action.newPostText , likesCount: '5' }] ,
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            return { ...state , newPostText: action.postMessage }
        case SET_URER_PROFILE:
            return { ...state , profile: action.profile }
        default :
            return state
    }
};

export default profileReducer;

export const addPostActionCreator = (text: string) => ({
    type: ADD_POST ,
    newPostText: text
} as const)

export const updateNewPostTextCreator = (text: string) => ({
    type: UPDATE_NEW_POST_TEXT ,
    postMessage: text
} as const)
export const setUserProfile = (profile: ProfileUserType) => ({
    type: SET_URER_PROFILE ,
    profile
}) as const