import {AppThunk} from "./redux-store";
import {authAPI} from "../API/socialNetworkAPI";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = 'AUTH/SET-USER-DATA';

const initialState: InitialState = {
    id: null ,
    login: null ,
    email: null ,
    isAuth: false
}


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

//thunk
export const getAuthUserData = (): AppThunk => async dispatch => {
    const res = await authAPI.me ()
    if ( res.data.resultCode === 0 ) {
        const { id , login , email } = res.data.data
        dispatch ( setAuthUserData ( id , login , email , true ) )
    }
}
export const login = (email: string , password: string , rememberMe: boolean): AppThunk => async dispatch => {
    const res = await authAPI.login ( email , password , rememberMe )
    if ( res.data.resultCode === 0 ) {
        await dispatch ( getAuthUserData () )
    } else {
        let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some Error'
        dispatch ( stopSubmit ( 'login' , { _error: message } ) )
    }
}
export const logOut = (): AppThunk => async dispatch => {
    const res = await authAPI.logOut ()
    if ( res.data.resultCode === 0 ) {
        dispatch ( setAuthUserData ( null , null , null , false ) )
    }
}
export default authReducer
//type
type InitialState = {
    id: null | number,
    login: null | string,
    email: null | string,
    isAuth: boolean
}
export type AuthReducerActionType = ReturnType<typeof setAuthUserData>