import {ActionType , PostsType , ProfilePageType} from "./store";

const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

let initialState = {
    posts: [
        { id: 1 , message: 'Hi how are you' , likesCount: '1' } ,
        { id: 2 , message: 'It\'s my post ' , likesCount: '23' }
    ] ,
    newPostText: 'It-kamasutra.com' ,
} as ProfilePageType
export type initialStateType = typeof initialState

const profileReducer = (state: initialStateType = initialState , action: ActionType): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state ,
                posts: [...state.posts , { id: 5 , message: action.newPostText , likesCount: '5' }] ,
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            return { ...state , newPostText: action.postMessage }
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