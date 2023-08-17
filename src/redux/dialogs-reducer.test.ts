import state , {DialogsPageType} from "./state";
import dialogsReducer , {sendMessageCreator , updateNewMessageBodyCreator} from "./dialogs-reducer";

test("message should be added to correct array",()=>{
    let startState: DialogsPageType = {...state.getState().dialogsPage}

    const action = sendMessageCreator();
    const endState = dialogsReducer(startState, action)

    expect(endState.messages.length).toBe(4)
    expect(endState.messages[endState.messages.length-1].message).toBeDefined()
    expect(endState.messages[endState.messages.length-1].id).toBeDefined()
})
test("message should be update to correct array",()=>{
    let startState: DialogsPageType = {...state.getState().dialogsPage}
    const action = updateNewMessageBodyCreator('Test message');
    const endState  = dialogsReducer(startState, action);

    expect(endState.newMessageBody).toEqual('Test message');
    expect(endState.messages).toEqual(endState.messages);
})



