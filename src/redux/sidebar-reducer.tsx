import {ActionType} from "./profile-reducer";


const initialState = {}
type InitialState = typeof initialState
const sidebarReducer = (state: InitialState = initialState , action: ActionType): InitialState => {
    switch (action.type) {
        default:
            return state
    }
};

export default sidebarReducer;