import axios from "axios";


export const setting = {
  headers: {
    "API-KEY": "f3eb22c4-26f8-436d-a4bb-37315a600abf"
  } ,
  withCredentials: true ,
}

export enum ResultCode {
  Sucsess = 0 ,
  Error = 1 ,
  Captcha = 10
}

export const instance = axios.create ( { baseURL: "https://social-network.samuraijs.com/api/1.0/" , ...setting } )


export type ResponseType<D = {}> = {
  resultCode: ResultCode
  messages: Array<string>
  data: D
}

