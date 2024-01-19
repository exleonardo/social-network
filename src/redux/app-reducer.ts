import { AppThunk } from '@/app/redux-store'

import { getAuthUserData } from './auth-reducer'

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
  try {
    const promise = await dispatch(getAuthUserData())

    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess())
    })
  } catch (error) {
    /* empty */
  }
}
//Type
type InitialStateApp = {
  initialized: boolean
}
type AppActionType = ReturnType<typeof initializedSuccess>
