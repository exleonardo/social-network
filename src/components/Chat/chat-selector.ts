import {AppStateType} from "../../redux/redux-store";

export const getMessages = (state: AppStateType) => {
  return state.chat.messages
}