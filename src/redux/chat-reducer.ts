import { ChatMessage, StatusType, chatAPI } from '@/API/chat-api'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'

import { AppThunk } from './redux-store'

const initialState = {
  messages: [] as Array<Pick<ChatMessage, keyof ChatMessage> & { id: string }>,
  status: 'pending' as StatusType,
}

type ChatStateType = typeof initialState

export const chatReducer = (
  state: ChatStateType = initialState,
  action: ChatReducerActionType
): ChatStateType => {
  switch (action.type) {
    case 'CHAT/SET-MESSAGES':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map(m => ({
            ...m,
            id: v1(),
          })),
        ].filter((_m, index, arr) => index >= arr.length - 100),
      }
    case 'CHAT/SET-STATUS':
      return { ...state, status: action.payload.status }
    default:
      return state
  }
}

export const setMessages = (messages: ChatMessage[]) =>
  ({ payload: { messages }, type: 'CHAT/SET-MESSAGES' }) as const
export const setStatus = (status: StatusType) =>
  ({ payload: { status }, type: 'CHAT/SET-STATUS' }) as const

let _newMessageHandler: ((message: ChatMessage[]) => void) | null = null
const newMessageHandler = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = mess => {
      dispatch(setMessages(mess))
    }
  }

  return _newMessageHandler
}

let _statusChangeHandler: ((status: StatusType) => void) | null = null
const statusChangeHandler = (dispatch: Dispatch) => {
  if (_statusChangeHandler === null) {
    _statusChangeHandler = status => {
      dispatch(setStatus(status))
    }
  }

  return _statusChangeHandler
}

export const startMessageListening = (): AppThunk => async dispatch => {
  chatAPI.start()
  chatAPI.subscribeOnMessages('messages-received', newMessageHandler(dispatch))
  chatAPI.subscribeOnMessages('status-changed', statusChangeHandler(dispatch))
}
export const stopMessageListening = (): AppThunk => async dispatch => {
  chatAPI.unsubscribeFromNewMessages('messages-received', newMessageHandler(dispatch))
  chatAPI.unsubscribeFromNewMessages('status-changed', statusChangeHandler(dispatch))
  chatAPI.stop()
}

export const sendMessage =
  (message: string): AppThunk =>
  async () => {
    chatAPI.sendMessage(message)
  }

export type ChatReducerActionType = ReturnType<typeof setMessages> | ReturnType<typeof setStatus>
