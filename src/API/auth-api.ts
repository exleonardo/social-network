import {instance , Response} from "./api";

export const authAPI = {
  me() {
    return instance.get<Response<DataAuthMe>> ( `auth/me` )
  } ,
  login(email: string , password: string , rememberMe: boolean = false , captcha: string | null = null) {
    return instance.post<Response<{ userId: number }>> ( 'auth/login' , {
      email ,
      password ,
      rememberMe ,
      captcha
    } );
  } ,
  logOut() {
    return instance.delete<Response> ( 'auth/login' );
  }

}
type DataAuthMe = {
  id: number,
  login: string,
  email: string
}

