import {sendMessageCreator} from "./dialogs-reducer";
import {profileAPI , ProfilePhotos , ProfileUserType , ResultCode} from "../API/socialNetworkAPI";
import {AppThunk} from "./redux-store";
import {PostsType} from "./store";

import {stopSubmit} from "redux-form";


const ADD_POST = 'PROFILE/ADD-POST';
const SET_STATUS = 'PROFILE/SET-STATUS';
const SET_USER_PROFILE = 'PROFILE/SET-USER-PROFILE';
const SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE-PHOTO-SUCCESS';

type ProfileStateType = {
  posts: PostsType[];
  profile: ProfileType;
  newPostText: string;
  status: string;

}
export type ProfileType = null | ProfileUserType

let initialState: ProfileStateType = {
  posts: [
    { id: 1 , message: 'Hi how are you' , likesCount: '1' } ,
    { id: 2 , message: 'It\'s my post ' , likesCount: '23' }
  ] ,
  profile: null ,
  newPostText: '' ,
  status: '' ,

}


const profileReducer = (state: ProfileStateType = initialState , action: ProfileReducerActionType): ProfileStateType => {
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
    case SAVE_PHOTO_SUCCESS:
      if ( state.profile ) {
        return {
          ...state ,
          profile: { ...state.profile , photos: { ...state.profile.photos , ...action.photos } }
        }
      }
      return { ...state }
    default :
      return state
  }
};

export default profileReducer;
//Actions
export const addPostActionCreator = (text: string) => ({
  type: ADD_POST ,
  newPostText: text
} as const)
export const setStatusAC = (status: string) => ({ type: SET_STATUS , status } as const)
export const setUserProfile = (profile: ProfileUserType) => ({
  type: SET_USER_PROFILE ,
  profile
}) as const
export const savePhotoSuccess = (photos: ProfilePhotos) => ({
  type: SAVE_PHOTO_SUCCESS ,
  photos
} as const)
//Thunk
export const getUserProfile = (userId: number | null): AppThunk => async dispatch => {
  const response = await profileAPI.getProfileUser ( userId )
  dispatch ( setUserProfile ( response.data ) )
}
export const getStatus = (status: string): AppThunk => async dispatch => {
  const res = await profileAPI.getStatus ( status )
  dispatch ( setStatusAC ( res.data ) )
}
export const updateStatus = (status: string): AppThunk => async dispatch => {
  try {
    const res = await profileAPI.updateStatus ( status )
    if ( res.data.resultCode === ResultCode.Sucsess ) {
      dispatch ( setStatusAC ( status ) )
    }
  } catch (errror) {

  }

}
export const savePhoto = (file: File): AppThunk => async dispatch => {
  const res = await profileAPI.savePhoto ( file )
  if ( res.data.resultCode === ResultCode.Sucsess ) {
    dispatch ( savePhotoSuccess ( res.data.data ) )
  }
}
export const saveProfile = (profile: ProfileUserType): AppThunk => async dispatch => {
  const res = await profileAPI.saveProfile ( profile )
  if ( res.data.resultCode === ResultCode.Sucsess ) {
    await dispatch ( getUserProfile ( profile.userId ) )
    return Promise.resolve ()

  } else if ( res.data.resultCode === ResultCode.Error ) {
    const findString = res.data.messages[0].split ( " " )
    const titleError = findString[findString.length - 1].split ( ' ' ).join ( '' )
    const indexFind = titleError.split ( '' ).findIndex ( el => el === '>' )
    const nameError = titleError.slice ( indexFind + 1 , titleError.length - 1 ).toLowerCase ()
    dispatch ( stopSubmit ( 'edit-profile' , { 'contacts': { [nameError]: res.data.messages[0] } } ) )
    return Promise.reject ( res.data.messages[0] )
  }
}

//types
export type ProfileReducerActionType =
  ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof savePhotoSuccess>

