import { ProfileReducerActionType } from './profile-reducer'

const initialState = {}

type InitialState = typeof initialState
const sidebarReducer = (
  state: InitialState = initialState,
  action: ProfileReducerActionType
): InitialState => {
  switch (action.type) {
    default:
      return state
  }
}

export default sidebarReducer
