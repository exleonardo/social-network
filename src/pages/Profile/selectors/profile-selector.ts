import { AppStateType } from '@/app/store/redux-store'

export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile
}
export const getCollapsed = (state: AppStateType) => {
  return state.profilePage.profileCollapsed
}
export const getEditProfile = (state: AppStateType) => {
  return state.profilePage.editProfile
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
