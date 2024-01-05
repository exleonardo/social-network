import {AppStateType} from "../../redux/redux-store";

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}
export const getCaptchaUrl = (state: AppStateType) => {
  return state.auth.captchaUrl
}

export const getInitialized = (state: AppStateType) => {
  return state.auth.captchaUrl
}
