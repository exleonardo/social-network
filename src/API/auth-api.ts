import { Response, instance } from './api'

export const authAPI = {
  logOut() {
    return instance.delete<Response>('auth/login')
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: null | string = null
  ) {
    return instance.post<Response<{ userId: number }>>('auth/login', {
      captcha,
      email,
      password,
      rememberMe,
    })
  },
  me() {
    return instance.get<Response<DataAuthMe>>(`auth/me`)
  },
}
type DataAuthMe = {
  email: string
  id: number
  login: string
}
