import { getAuthUserData } from './auth-reducer'
import { AppThunk } from './redux-store'

const initialState: InitialStateApp = {
  initialized: false,
}

const appReducer = (state: InitialStateApp = initialState, action: AppActionType) => {
  switch (action.type) {
    case 'APP/INITIALIZED-SUCCESS':
      return { ...state, initialized: true }
    default:
      return state
  }
}

export default appReducer
//Actions
export const initializedSuccess = () => ({ type: 'APP/INITIALIZED-SUCCESS' }) as const
//Thunk
export const initializeApp = (): AppThunk => async dispatch => {
  const promise = dispatch(getAuthUserData())

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess())
  })
}
//Type
type InitialStateApp = {
  initialized: boolean
}
type AppActionType = ReturnType<typeof initializedSuccess>
