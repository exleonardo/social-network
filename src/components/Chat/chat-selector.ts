import { AppStateType } from '../../redux/redux-store'

export const getMessages = (state: AppStateType) => {
  return state.chat.messages
}
export const getStatus = (state: AppStateType) => {
  return state.chat.status
}
