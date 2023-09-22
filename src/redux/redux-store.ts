import {combineReducers , createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import SidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

export const rootReducer = combineReducers ( {
    profilePage: profileReducer ,
    dialogsPage: dialogsReducer ,
    sidebar: SidebarReducer ,
    usersPage: usersReducer ,
    auth: authReducer
} )

export type AppStateType = ReturnType<typeof rootReducer>
const store = createStore ( rootReducer );


export default store

// @ts-ignore
window.store = store