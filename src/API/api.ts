import axios from 'axios'

export const setting = {
  headers: {
    'API-KEY': 'f3eb22c4-26f8-436d-a4bb-37315a600abf',
  },
  withCredentials: true,
}

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  ...setting,
})

export type Response<D = {}, RC = ResultCode> = {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: RC
}

export enum ResultCode {
  Captcha = 10,
  Error = 1,
  Sucsess = 0,
}
