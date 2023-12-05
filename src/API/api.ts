import axios from "axios";


export const setting = {
  headers: {
    "API-KEY": "f3eb22c4-26f8-436d-a4bb-37315a600abf"
  } ,
  withCredentials: true ,
}

export const instance = axios.create ( { baseURL: "https://social-network.samuraijs.com/api/1.0/" , ...setting } )


export type Response<D = {} , RC = ResultCode> = {
  data: D
  messages: string[]
  resultCode: RC
  fieldsErrors: string[]
}

export enum ResultCode {
  Sucsess = 0 ,
  Error = 1 ,
  Captcha = 10
}