import { ProfileReducerActionType } from './profile-reducer'
import { DialogsPageType } from './store'

const initialState = {
  dialogs: [
    { id: '1', name: 'Dimych' },
    { id: '2', name: 'Andrey' },
    { id: '3', name: 'Svaeta' },
    { id: '4', name: 'Victor' },
    { id: '5', name: 'Valera' },
  ],
  messages: [
    { id: '1', message: 'Hi' },
    { id: '2', message: 'How is you it-camasutra' },
    { id: '3', message: 'yo' },
  ],
} as DialogsPageType

const dialogsReducer = (
  state: InitialStateType = initialState,
  action: ProfileReducerActionType
): InitialStateType => {
  switch (action.type) {
    case 'SEND-MESSAGE':
      const body = action.newMessageBody

      return {
        ...state,
        messages: [...state.messages, { id: '4', message: body }],
        newMessageBody: body,
      }
    default:
      return state
  }
}

export default dialogsReducer

export const sendMessageCreator = (newMessageBody: string) =>
  ({
    newMessageBody,
    type: 'SEND-MESSAGE',
  }) as const
export type InitialStateType = typeof initialState
