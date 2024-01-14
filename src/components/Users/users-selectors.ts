import { UsersInfoType } from '@/API/profile-api'
import { AppStateType } from '@/redux/redux-store'
import { createSelector } from 'reselect'

export const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector, (users: UsersInfoType[]) => {
  return users
})
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}
export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter
}
export const getUsersId = (state: AppStateType) => {
  return state.profilePage.profile?.userId
}
