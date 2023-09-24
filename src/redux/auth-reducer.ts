import {AppThunk} from "./redux-store";
import {socialNetworkAPI} from "../components/API/socialNetworkAPI";

const SET_USER_DATA = 'SET-USER-DATA';

type InitialState = {
    id: null | number,
    login: null | string,
    email: null | string,
    isAuth: boolean
}
const initialState = {
    id: null ,
    login: null ,
    email: null ,
    isAuth: false
}

export type AuthReducerActionType = ReturnType<typeof setAuthUserData>

const authReducer = (state: InitialState = initialState , action: AuthReducerActionType): InitialState => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state , ...action.data }
        default :
            return state
    }

}
export const setAuthUserData = (userId: number , login: string , email: string) => {
    return ({
        type: SET_USER_DATA ,
        data: {
            userId ,
            login ,
            email
        }
    } as const)
}
export const authMe = (): AppThunk => {
    return async dispatch => {
        const res = await socialNetworkAPI.getAuthMe ()
        if ( res.data.resultCode === 0 ) {
            const { id , login , email } = res.data.data
            dispatch ( setAuthUserData ( id , login , email ) )
        }
    }
        
}
export default authReducer