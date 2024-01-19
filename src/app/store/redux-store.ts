import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { ChatReducerActionType, chatReducer } from '@/redux/chat-reducer'
import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { FormAction } from 'redux-form/lib/actions'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import appReducer from '../../redux/app-reducer'
import authReducer, { AuthReducerActionType } from '../../redux/auth-reducer'
import profileReducer, { ProfileReducerActionType } from '../../redux/profile-reducer'
import SidebarReducer from '../../redux/sidebar-reducer'
import usersReducer, { UserReducerActionType } from '../../redux/users-reducer'

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  chat: chatReducer,
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
