import { ResultCode } from '@/API/api'
import { ProfileDataFormType, ProfilePhotos, ProfileUserType, profileAPI } from '@/API/profile-api'
import { AppThunk } from '@/app/store/redux-store'
import { toggleIsFetching } from '@/redux/users-reducer'
import { isAxiosError } from 'axios'

export type PostsType = {
  id: number
  isLiked: boolean
  likesCount: number
  message: string
}

const initialState = {
  editProfile: false,
  newPostText: '',
  posts: [] as PostsType[],
  profile: null as ProfileType,
  profileCollapsed: true,
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
        posts: [
          ...state.posts,
          { id: +new Date(), isLiked: false, likesCount: 0, message: action.newPostText },
        ],
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
    case 'PROFILE/EDIT-PROFILE':
      return { ...state, editProfile: action.editProfile }
    case 'PROFILE/SET-COLLAPSED':
      return { ...state, profileCollapsed: action.collapsed }
    case 'PROFILE/CLEAR-USER-PROFILE':
      return { ...state, profile: null }
    case 'PROFILE/TOGGLE-LIKE':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.id
            ? {
                ...post,
                isLiked: !post.isLiked,
                likesCount: post.likesCount ? post.likesCount - 1 : post.likesCount + 1,
              }
            : post
        ),
      }
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

export const toggleLike = (id: number) =>
  ({
    id,
    type: 'PROFILE/TOGGLE-LIKE',
  }) as const

export const deletePostActionCreator = (id: number) =>
  ({
    id,
    type: 'PROFILE/DELETE-POST',
  }) as const
export const setEditProfile = (editProfile: boolean) =>
  ({
    editProfile,
    type: 'PROFILE/EDIT-PROFILE',
  }) as const

export const setStatusAC = (status: string) => ({ status, type: 'PROFILE/SET-STATUS' }) as const
export const setCollapsed = (collapsed: boolean) =>
  ({ collapsed, type: 'PROFILE/SET-COLLAPSED' }) as const

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
export const clearUserProfile = () =>
  ({
    type: 'PROFILE/CLEAR-USER-PROFILE',
  }) as const
//Thunk
export const getUserProfile =
  (userId: null | string): AppThunk =>
  async dispatch => {
    dispatch(toggleIsFetching(true))
    try {
      const response = await profileAPI.getProfileUser(userId)

      dispatch(setUserProfile(response.data))
      dispatch(toggleIsFetching(false))
    } catch (error) {
      /* empty */
    }
  }

export const getStatus =
  (status: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(toggleIsFetching(true))
      const res = await profileAPI.getStatus(status)

      dispatch(setStatusAC(res.data))
      dispatch(toggleIsFetching(false))
    } catch (e) {
      /* empty */
    }
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

export const saveProfile =
  (profile: ProfileDataFormType): AppThunk =>
  async (dispatch, getState) => {
    const userId = getState().auth.id

    try {
      const res = await profileAPI.saveProfile(profile)

      if (res.data.resultCode === ResultCode.Sucsess) {
        if (userId) {
          await dispatch(getUserProfile(userId.toString()))
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
      /* empty */
    }
  }

//types
export type ProfileReducerActionType =
  | ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof clearUserProfile>
  | ReturnType<typeof deletePostActionCreator>
  | ReturnType<typeof savePhotoSuccess>
  | ReturnType<typeof setCollapsed>
  | ReturnType<typeof setEditProfile>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof toggleLike>

export type ProfileType = ProfileUserType | null
type ProfileState = typeof initialState
type ProfileStateType = {
  editProfile: boolean
  newPostText: string
  posts: PostsType[]
  profile: ProfileType
  profileCollapsed: boolean
  status: string
}
