import { AppStateType } from '@/redux/redux-store'

export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile
}
export const getStatusProfile = (state: AppStateType) => {
  return state.profilePage.status
}
export const getMyPosts = (state: AppStateType) => {
  return state.profilePage.posts
}

export const getNewPostText = (state: AppStateType) => {
  return state.profilePage.newPostText
}
