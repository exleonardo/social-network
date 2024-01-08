import {AppStateType} from "../../redux/redux-store";

export const getDialogsPage = (state: AppStateType) => {
  return state.dialogsPage.dialogs
}

export const getDialogMessages = (state: AppStateType) => {
  return state.dialogsPage.messages
}