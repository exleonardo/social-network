import dialogsReducer, { sendMessageCreator } from './dialogs-reducer'
import state from './redux-store'
import { DialogsPageType } from './store'

test('message should be added to correct array', () => {
  const startState: DialogsPageType = { ...state.getState().dialogsPage }

  const action = sendMessageCreator('test message')
  const endState = dialogsReducer(startState, action)

  expect(endState.newMessageBody).toBe('test message')
  expect(endState.messages.length).toBe(4)
  expect(endState.messages[endState.messages.length - 1].message).toBeDefined()
  expect(endState.messages[endState.messages.length - 1].id).toBeDefined()
})
