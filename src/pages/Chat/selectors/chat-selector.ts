import { AppStateType } from '@/app/store/redux-store'

export const getMessages = (state: AppStateType) => {
  return state.chat.messages
}
export const getStatus = (state: AppStateType) => {
  return state.chat.status
}
