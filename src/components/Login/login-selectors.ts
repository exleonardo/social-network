import { AppStateType } from '@/redux/redux-store'

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}

export const getInitialized = (state: AppStateType) => {
  return state.auth.captchaUrl
}
export const getLogin = (state: AppStateType) => {
  return state.auth.login
}
export const getCurrentUserId = (state: AppStateType) => {
  return state.auth.id
}
