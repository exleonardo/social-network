import {AppThunk} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

const initialState: InitialStateApp = {
    initialized: false
}

const appReducer = (state: InitialStateApp = initialState , action: AppActionType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state , initialized: true }
        default:
            return state
    }
}


export default appReducer;
//Actions
export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS } as const)
//Thunk
export const initializeApp = (): AppThunk => async dispatch => {
    const promise = dispatch ( getAuthUserData () );
    Promise.all ( [promise] ).then ( () => {
        dispatch ( initializedSuccess () )
    } )

}
//Type
type InitialStateApp = {
    initialized: boolean
}
type AppActionType = ReturnType<typeof initializedSuccess>