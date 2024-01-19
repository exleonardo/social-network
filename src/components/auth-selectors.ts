import { AppStateType } from '@/app/redux-store'

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}

export const getInitialized = (state: AppStateType) => {
  return state.auth.isInitializating
}
export const getLogin = (state: AppStateType) => {
  return state.auth.login
}
export const getCurrentUserId = (state: AppStateType) => {
  return state.auth.id
}
export const getCaptchaUrl = (state: AppStateType) => {
  return state.auth.captchaUrl
}
