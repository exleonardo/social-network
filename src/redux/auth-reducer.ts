import {AppThunk} from "./redux-store";
import {authAPI , securityAPI} from "../API/socialNetworkAPI";
import {stopSubmit} from "redux-form";


const SET_USER_DATA = 'AUTH/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'AUTH/GET-CAPTCHA-URL-SUCCESS';

const initialState: InitialState = {
    id: null ,
    login: null ,
    email: null ,
    isAuth: false ,
    captchaUrl: null

}


const authReducer = (state: InitialState = initialState , action: AuthReducerActionType): InitialState => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state , ...action.payload }
        case GET_CAPTCHA_URL_SUCCESS:
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
export const getCaptchaUrlSuccess = (captchaUrl: string | null) => ({
    type: GET_CAPTCHA_URL_SUCCESS ,
    payload: { captchaUrl }

} as const)

//thunk
export const getAuthUserData = (): AppThunk => async dispatch => {
    const res = await authAPI.me ()
    if ( res.data.resultCode === 0 ) {
        const { id , login , email } = res.data.data
        dispatch ( setAuthUserData ( id , login , email , true ) )
    }
}
export const login = (email: string , password: string , rememberMe: boolean , captcha: string | null): AppThunk => async dispatch => {
    const res = await authAPI.login ( email , password , rememberMe , captcha )
    if ( res.data.resultCode === 0 ) {
        await dispatch ( getAuthUserData () )
    } else {
        if ( res.data.resultCode === 10 ) {
            dispatch ( getCaptchaUrl () )
        }
        let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some Error'
        dispatch ( stopSubmit ( 'login' , { _error: message } ) )
    }
}
export const getCaptchaUrl = (): AppThunk => async dispatch => {
    const res = await securityAPI.getCaptchaUrl ()
    const captchaUrl = res.data.url
    dispatch ( getCaptchaUrlSuccess ( captchaUrl ) )
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
    id: null | number;
    login: null | string;
    email: null | string;
    isAuth: boolean;
    captchaUrl: string | null;
}
export type AuthReducerActionType = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlSuccess>