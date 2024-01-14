import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { FormAction } from 'redux-form/lib/actions'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import appReducer from './app-reducer'
import authReducer, { AuthReducerActionType } from './auth-reducer'
import { ChatReducerActionType, chatReducer } from './chat-reducer'
import profileReducer, { ProfileReducerActionType } from './profile-reducer'
import SidebarReducer from './sidebar-reducer'
import usersReducer, { UserReducerActionType } from './users-reducer'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  chat: chatReducer,
  form: formReducer,
  profilePage: profileReducer,
  sidebar: SidebarReducer,
  usersPage: usersReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
// const store = createStore ( rootReducer , applyMiddleware ( ThunkMiddleware ) );

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
)

export type AppActionsType =
  | AuthReducerActionType
  | ChatReducerActionType
  | FormAction
  | ProfileReducerActionType
  | UserReducerActionType
export type AppThunk = ThunkAction<Promise<ReturnType<any>>, AppStateType, unknown, AppActionsType>
export type AppDispatchType = ThunkDispatch<AppStateType, never, AnyAction>
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatchType = useDispatch
export default store
