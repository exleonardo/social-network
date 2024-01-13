import { ResultCode } from '@/API/api'
import { ProfileDataFormType, ProfilePhotos, ProfileUserType, profileAPI } from '@/API/profile-api'
import { UploadFile } from 'antd'
import { isAxiosError } from 'axios'

import { sendMessageCreator } from './dialogs-reducer'
import { AppThunk } from './redux-store'
import { PostsType } from './store'

const initialState = {
  newPostText: '',
  posts: [] as PostsType[],
  profile: null as ProfileType,
  status: '',
}

const profileReducer = (
  state: ProfileState = initialState,
  action: ProfileReducerActionType
): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE/ADD-POST':
      return {
        ...state,
        newPostText: '',
        posts: [...state.posts, { id: +new Date(), likesCount: '0', message: action.newPostText }],
      }
    case 'PROFILE/DELETE-POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id),
      }
    case 'PROFILE/SET-USER-PROFILE':
      return { ...state, profile: action.profile }
    case 'PROFILE/SET-STATUS':
      return { ...state, status: action.status }
    case 'PROFILE/SAVE-PHOTO-SUCCESS':
      if (state.profile) {
        return {
          ...state,
          profile: {
            ...state.profile,
            photos: { ...state.profile.photos, ...action.photos },
          },
        }
      }

      return { ...state }
    default:
      return state
  }
}

export default profileReducer
//Actions
export const addPostActionCreator = (text: string) =>
  ({
    newPostText: text,
    type: 'PROFILE/ADD-POST',
  }) as const
export const deletePostActionCreator = (id: number) =>
  ({
    id,
    type: 'PROFILE/DELETE-POST',
  }) as const

export const setStatusAC = (status: string) => ({ status, type: 'PROFILE/SET-STATUS' }) as const

export const setUserProfile = (profile: ProfileUserType) =>
  ({
    profile,
    type: 'PROFILE/SET-USER-PROFILE',
  }) as const

export const savePhotoSuccess = (photos: ProfilePhotos) =>
  ({
    photos,
    type: 'PROFILE/SAVE-PHOTO-SUCCESS',
  }) as const
//Thunk
export const getUserProfile =
  (userId: null | string): AppThunk =>
  async dispatch => {
    try {
      const response = await profileAPI.getProfileUser(userId)

      dispatch(setUserProfile(response.data))
    } catch (error) {
      console.log(error)
    }
  }

export const getStatus =
  (status: string): AppThunk =>
  async dispatch => {
    const res = await profileAPI.getStatus(status)

    dispatch(setStatusAC(res.data))
  }

export const updateStatus =
  (status: string): AppThunk =>
  async dispatch => {
    try {
      const res = await profileAPI.updateStatus(status)

      if (res.data.resultCode === ResultCode.Sucsess) {
        dispatch(setStatusAC(status))

        return Promise.resolve()
      }
    } catch (error) {
      let errorMessage = 'Some error occurred'

      if (isAxiosError(error)) {
        errorMessage = error.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      return Promise.reject(errorMessage)
    }
  }

export const savePhoto =
  (file: UploadFile<any>): AppThunk =>
  async dispatch => {
    try {
      const res = await profileAPI.savePhoto(file)

      if (res.data.resultCode === ResultCode.Sucsess) {
        dispatch(savePhotoSuccess(res.data.data))
      }
      if (res.data.resultCode === ResultCode.Error) {
        return Promise.reject(res.data.messages[0])
      }
    } catch (error) {}
  }

export const saveProfile =
  (profile: ProfileDataFormType): AppThunk =>
  async (dispatch, getState) => {
    const userId = getState().profilePage.profile?.userId

    try {
      const res = await profileAPI.saveProfile(profile)

      if (res.data.resultCode === ResultCode.Sucsess) {
        if (userId) {
          await dispatch(getUserProfile(userId))
        } else {
          throw new Error("UserId can't be null")
        }

        return Promise.resolve()
      } else if (res.data.resultCode === ResultCode.Error) {
        const findString = res.data.messages[0].split(' ')
        const titleError = findString[findString.length - 1].split(' ').join('')
        const indexFind = titleError.split('').findIndex(el => el === '>')
        const nameError = titleError.slice(indexFind + 1, titleError.length - 1)
        const firstLetterLowerCase = nameError[0].toLowerCase() + nameError.slice(1)

        return Promise.reject({ field: firstLetterLowerCase, message: res.data.messages[0] })
      }
    } catch (error) {
      console.log(error)
    }
  }

//types
export type ProfileReducerActionType =
  | ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof deletePostActionCreator>
  | ReturnType<typeof savePhotoSuccess>
  | ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof setUserProfile>

export type ProfileType = ProfileUserType | null
type ProfileState = typeof initialState
type ProfileStateType = {
  newPostText: string
  posts: PostsType[]
  profile: ProfileType
  status: string
}
