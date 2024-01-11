import { ResultCode } from '@/API/api'
import { authAPI } from '@/API/auth-api'
import { securityAPI } from '@/API/security-api'
import { stopSubmit } from 'redux-form'

import { AppThunk } from './redux-store'

const initialState: InitialState = {
  captchaUrl: null as null | string,
  email: null as null | string,
  id: null as null | number,
  isAuth: false as boolean,
  login: null as null | string,
}

const authReducer = (
  state: InitialState = initialState,
  action: AuthReducerActionType
): InitialState => {
  switch (action.type) {
    case 'AUTH/SET-USER-DATA':
      return { ...state, ...action.payload }
    case 'AUTH/GET-CAPTCHA-URL-SUCCESS':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const setAuthUserData = (
  id: null | number,
  login: null | string,
  email: null | string,
  isAuth: boolean
) =>
  ({
    payload: {
      email,
      id,
      isAuth,
      login,
    },
    type: 'AUTH/SET-USER-DATA',
  }) as const
export const getCaptchaUrlSuccess = (captchaUrl: null | string) =>
  ({
    payload: { captchaUrl },
    type: 'AUTH/GET-CAPTCHA-URL-SUCCESS',
  }) as const

//thunk
export const getAuthUserData = (): AppThunk => async dispatch => {
  const res = await authAPI.me()

  if (res.data.resultCode === ResultCode.Sucsess) {
    const { email, id, login } = res.data.data

    dispatch(setAuthUserData(id, login, email, true))
  }
}
export const login =
  (email: string, password: string, rememberMe: boolean, captcha: null | string): AppThunk =>
  async dispatch => {
    const res = await authAPI.login(email, password, rememberMe, captcha)

    if (res.data.resultCode === ResultCode.Sucsess) {
      await dispatch(getAuthUserData())
    } else {
      if (res.data.resultCode === ResultCode.Captcha) {
        dispatch(getCaptchaUrl())
      }
      const message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some Error'

      dispatch(stopSubmit('login', { _error: message }))
    }
  }
export const getCaptchaUrl = (): AppThunk => async dispatch => {
  const res = await securityAPI.getCaptchaUrl()
  const captchaUrl = res.data.url

  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logOut = (): AppThunk => async dispatch => {
  const res = await authAPI.logOut()

  if (res.data.resultCode === ResultCode.Sucsess) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}
export default authReducer
//type
type InitialState = {
  captchaUrl: null | string
  email: null | string
  id: null | number
  isAuth: boolean
  login: null | string
}
export type AuthReducerActionType =
  | ReturnType<typeof getCaptchaUrlSuccess>
  | ReturnType<typeof setAuthUserData>
