import {combineReducers , createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import SidebarReducer from "./sidebar-reducer";

export const rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    sidebar: SidebarReducer
})


export type AppStateType = ReturnType<typeof rootReducer>

 const store = createStore(rootReducer);
 export type StoreReduxType = typeof store

export default store