import {AnyAction , applyMiddleware , combineReducers , createStore} from "redux";
import profileReducer , {ProfileReducerActionType} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import SidebarReducer from "./sidebar-reducer";
import usersReducer , {UserReducerActionType} from "./users-reducer";
import authReducer , {AuthReducerActionType} from "./auth-reducer";
import ThunkMiddleware , {ThunkAction , ThunkDispatch} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {FormAction} from "redux-form/lib/actions";

export const rootReducer = combineReducers ( {
    profilePage: profileReducer ,
    dialogsPage: dialogsReducer ,
    sidebar: SidebarReducer ,
    usersPage: usersReducer ,
    auth: authReducer ,
    form: formReducer
} )

export type AppStateType = ReturnType<typeof rootReducer>
const store = createStore ( rootReducer , applyMiddleware ( ThunkMiddleware ) );

export type AppActionsType =
    UserReducerActionType
    | AuthReducerActionType
    | ProfileReducerActionType
    | FormAction
export type AppThunk = ThunkAction<Promise<void> , AppStateType , unknown , AppActionsType>
export type AppDispatchType = ThunkDispatch<AppStateType , any , AnyAction>

export default store

// @ts-ignore
window.store = store