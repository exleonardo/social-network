import {DialogsPageType} from "./store";
import state from './redux-store'
import dialogsReducer , {sendMessageCreator} from "./dialogs-reducer";

test ( "message should be added to correct array" , () => {
  let startState: DialogsPageType = { ...state.getState ().dialogsPage }

  const action = sendMessageCreator ( 'test message' );
  const endState = dialogsReducer ( startState , action )

  expect ( endState.newMessageBody ).toBe ( 'test message' )
  expect ( endState.messages.length ).toBe ( 4 )
  expect ( endState.messages[endState.messages.length - 1].message ).toBeDefined ()
  expect ( endState.messages[endState.messages.length - 1].id ).toBeDefined ()
} )




