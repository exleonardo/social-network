import {sendMessageCreator} from "./dialogs-reducer";
import {profileAPI , ProfileUserType} from "../API/socialNetworkAPI";
import {ProfilePageType} from "./store";
import {AppThunk} from "./redux-store";

const SET_USER_PROFILE = 'SET-USER-PROFILE'
const ADD_POST = 'ADD-POST';
const SET_STATUS = 'SET-STATUS'

export type ProfileReducerActionType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatusAC>

let initialState = {
    posts: [
        { id: 1 , message: 'Hi how are you' , likesCount: '1' } ,
        { id: 2 , message: 'It\'s my post ' , likesCount: '23' }
    ] ,
    profile: null ,
} as ProfilePageType
type InitialState = typeof initialState


const profileReducer = (state: InitialState = initialState , action: ProfileReducerActionType): InitialState => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state ,
                posts: [...state.posts , { id: 5 , message: action.newPostText , likesCount: '5' }] ,
                newPostText: ""
            }
        case SET_USER_PROFILE:
            return { ...state , profile: action.profile }
        case SET_STATUS:
            return { ...state , status: action.status }
        default :
            return state
    }
};

export default profileReducer;

export const addPostActionCreator = (text: string) => ({
    type: ADD_POST ,
    newPostText: text
} as const)
export const setStatusAC = (status: string) => ({ type: SET_STATUS , status } as const)

export const setUserProfile = (profile: ProfileUserType) => ({
    type: SET_USER_PROFILE ,
    profile
}) as const
//Thunk
export const getUserProfile = (userId: string): AppThunk => {
    return async dispatch => {
        const response = await profileAPI.getProfileUser ( userId )
        dispatch ( setUserProfile ( response.data ) )
    }
}
export const getStatus = (status: string): AppThunk => {
    return async dispatch => {
        profileAPI.getStatus ( status ).then ( res => dispatch ( setStatusAC ( res.data ) ) )
    }
}
export const updateStatus = (status: string): AppThunk => {
    return async dispatch => {
        profileAPI.updateStatus ( status ).then ( res => {
                if ( res.data.resultCode === 0 ) {
                    dispatch ( setStatusAC ( status ) )
                }
            }
        )
    }
}