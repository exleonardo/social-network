import {chatAPI , ChatMessage} from "../API/chat-api";
import {AppDispatchType , AppThunk} from "./redux-store";


const initialState = {
  messages: [] as ChatMessage[]

}
type ChatStateType = typeof initialState


export const chatReducer = (state: ChatStateType = initialState , action: ChatReducerActionType): ChatStateType => {
  switch (action.type) {
    case "CHAT/SET-MESSAGES":

      return { ...state , messages: [...state.messages , ...action.payload] }
    default:
      return state


  }

}


let _newMessageHandler: ((message: ChatMessage[]) => void) | null = null

export const setMessages = (messages: ChatMessage[]) => ({ type: 'CHAT/SET-MESSAGES' , payload: messages })


const newMessageHandler = (dispatch: AppDispatchType) => {

  if ( _newMessageHandler === null ) {
    _newMessageHandler = (mess) => {
      dispatch ( setMessages ( mess ) )
    }
  }

  return _newMessageHandler

}

export const startMessageListening = (): AppThunk => async (dispatch) => {
  chatAPI.start ()
  chatAPI.subscribe ( newMessageHandler ( dispatch ) )
}
export const stopMessageListening = (): AppThunk => async (dispatch) => {
  chatAPI.unsubscribe ( newMessageHandler ( dispatch ) )
  chatAPI.stop ()
}

export const sendMessage = (message: string): AppThunk => async (dispatch) => {
  chatAPI.sendMessage ( message )
}

export type ChatReducerActionType = ReturnType<typeof setMessages>