import {sendMessageCreator} from "./dialogs-reducer";
import {ResultCode} from "../API/api";
import {AppStateType , AppThunk} from "./redux-store";
import {PostsType} from "./store";

import {stopSubmit} from "redux-form";
import {profileAPI , ProfilePhotos , ProfileUserType} from "../API/profile-api";


let initialState = {
  posts: [
    { id: 1 , message: 'Hi how are you' , likesCount: '1' } ,
    { id: 2 , message: 'It\'s my post ' , likesCount: '23' }
  ] ,
  profile: null as ProfileType ,
  newPostText: '' ,
  status: '' ,

}


const profileReducer = (state: ProfileState = initialState , action: ProfileReducerActionType): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE/ADD-POST':
      return {
        ...state ,
        posts: [...state.posts , { id: 5 , message: action.newPostText , likesCount: '5' }] ,
        newPostText: ""
      }
    case 'PROFILE/SET-USER-PROFILE':
      return { ...state , profile: action.profile }
    case 'PROFILE/SET-STATUS':
      return { ...state , status: action.status }
    case 'PROFILE/SAVE-PHOTO-SUCCESS':
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
  type: 'PROFILE/ADD-POST' ,
  newPostText: text
} as const)

export const setStatusAC = (status: string) => ({ type: 'PROFILE/SET-STATUS' , status } as const)

export const setUserProfile = (profile: ProfileUserType) => ({
  type: 'PROFILE/SET-USER-PROFILE' ,
  profile
}) as const

export const savePhotoSuccess = (photos: ProfilePhotos) => ({
  type: 'PROFILE/SAVE-PHOTO-SUCCESS' ,
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
  } catch (error) {

  }
}

export const savePhoto = (file: File): AppThunk => async dispatch => {
  const res = await profileAPI.savePhoto ( file )
  if ( res.data.resultCode === ResultCode.Sucsess ) {
    dispatch ( savePhotoSuccess ( res.data.data ) )
  }
}

export const saveProfile = (profile: ProfileUserType): AppThunk => async (dispatch , getState) => {
  const userId = getState ().profilePage.profile?.userId
  const res = await profileAPI.saveProfile ( profile )
  if ( res.data.resultCode === ResultCode.Sucsess ) {
    if ( userId ) {
      await dispatch ( getUserProfile ( userId ) )
    } else {
      throw new Error ( "UserId can't be null" )
    }
    return Promise.resolve ()

  } else if ( res.data.resultCode === ResultCode.Error ) {
    const findString = res.data.messages[0].split ( " " )
    const titleError = findString[findString.length - 1].split ( ' ' ).join ( '' )
    const indexFind = titleError.split ( '' ).findIndex ( el => el === '>' )
    const nameError = titleError.slice ( indexFind + 1 , titleError.length - 1 )
    const firstLetterUpperCase = nameError[0].toLowerCase () + nameError.slice ( 1 )
    dispatch ( stopSubmit ( 'edit-profile' , { 'contacts': { [firstLetterUpperCase]: res.data.messages[0] } } ) )
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


export type ProfileType = null | ProfileUserType
type ProfileState = typeof initialState
type ProfileStateType = {
  posts: PostsType[];
  profile: ProfileType;
  newPostText: string;
  status: string;
}