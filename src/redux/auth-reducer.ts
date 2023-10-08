import {AppThunk} from "./redux-store";
import {authAPI} from "../API/socialNetworkAPI";


const SET_USER_DATA = 'SET-USER-DATA';

type InitialState = {
    id: null | number,
    login: null | string,
    email: null | string,
    isAuth: boolean
}
const initialState: InitialState = {
    id: null ,
    login: null ,
    email: null ,
    isAuth: false
}

export type AuthReducerActionType = ReturnType<typeof setAuthUserData>

const authReducer = (state: InitialState = initialState , action: AuthReducerActionType): InitialState => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state , ...action.payload }
        default :
            return state
    }

}
export const setAuthUserData = (userId: number | null , login: string | null , email: string | null , isAuth: boolean) => ({
    type: SET_USER_DATA ,
    payload: {
        userId ,
        login ,
        email ,
        isAuth
    }
} as const)
export const getAuthUserData = (): AppThunk => async dispatch => {
    const res = await authAPI.me ()
    if ( res.data.resultCode === 0 ) {
        const { id , login , email } = res.data.data
        dispatch ( setAuthUserData ( id , login , email , true ) )
    }
}
//thunk
export const login = (email: string , password: string , rememberMe: boolean): AppThunk => async dispatch => {
    authAPI.login ( email , password , rememberMe ).then ( res => {
        if ( res.data.resultCode === 0 ) {
            dispatch ( getAuthUserData () )
        }
    } )

}
export const logOut = (): AppThunk => async dispatch => {
    const res = await authAPI.logOut ()
    if ( res.data.resultCode === 0 ) {
        dispatch ( setAuthUserData ( null , null , null , false ) )
    }
}
export default authReducer