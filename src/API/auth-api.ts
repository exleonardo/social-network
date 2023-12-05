import {instance , ResponseType} from "./api";

export const authAPI = {
  me() {
    return instance.get<AuthMeType> ( `auth/me` )
  } ,
  login(email: string , password: string , rememberMe: boolean = false , captcha: string | null = null) {
    return instance.post<ResponseType<{ userId: number }>> ( 'auth/login' , {
      email ,
      password ,
      rememberMe ,
      captcha
    } );
  } ,
  logOut() {
    return instance.delete<ResponseType> ( 'auth/login' );
  }

}
export type DataAuthMe = {
  id: number,
  login: string,
  email: string
}
type AuthMeType = {
  data: DataAuthMe,
  messages: [],
  fieldsErrors: [],
  resultCode: number
}