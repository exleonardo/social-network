import { ResultCode } from '@/API/api'
import { authAPI } from '@/API/auth-api'
import { securityAPI } from '@/API/security-api'
import { clearUserProfile } from '@/redux/profile-reducer'

import { AppThunk } from './redux-store'

const initialState: InitialState = {
  captchaUrl: null as null | string,
  email: null as null | string,
  id: null as null | number,
  isAuth: false as boolean,
  isInitializating: false as boolean,
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
    case 'AUTH/CLEAR-CAPTCHA-URL':
      return { ...state, captchaUrl: null }
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
export const clearCaptchaUrl = () =>
  ({
    type: 'AUTH/CLEAR-CAPTCHA-URL',
  }) as const
//thunk
export const getAuthUserData = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.me()

    if (res.data.resultCode === ResultCode.Sucsess) {
      const { email, id, login } = res.data.data

      dispatch(setAuthUserData(id, login, email, true))

      return res.data
    }
  } catch (error) {
    /* empty */
  }
}
export const login =
  (email: string, password: string, rememberMe: boolean, captcha: null | string): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.login(email, password, rememberMe, captcha)

      if (res.data.resultCode === ResultCode.Sucsess) {
        const res = await dispatch(getAuthUserData())

        return res.data
      } else if (res.data.resultCode === ResultCode.Error) {
        const message =
          res.data.messages.length > 0 ? res.data.messages[0] : res.data.fieldsErrors[0]

        return message
      } else {
        if (res.data.resultCode === ResultCode.Captcha) {
          dispatch(getCaptchaUrl())

          return res.data.fieldsErrors[0]
        }
      }
    } catch (e) {
      /* empty */
    }
  }
export const getCaptchaUrl = (): AppThunk => async dispatch => {
  const res = await securityAPI.getCaptchaUrl()
  const captchaUrl = res.data.url

  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logOut = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.logOut()

    if (res.data.resultCode === ResultCode.Sucsess) {
      dispatch(setAuthUserData(null, null, null, false))
      dispatch(clearUserProfile())
    }
  } catch (error) {
    /* empty */
  }
}
export default authReducer
//type
type InitialState = {
  captchaUrl: null | string
  email: null | string
  id: null | number
  isAuth: boolean
  isInitializating: boolean
  login: null | string
}
export type AuthReducerActionType =
  | ReturnType<typeof clearCaptchaUrl>
  | ReturnType<typeof getCaptchaUrlSuccess>
  | ReturnType<typeof setAuthUserData>
