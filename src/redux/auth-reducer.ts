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

type ActionType = ReturnType<typeof setAuthUserData>

const authReducer = (state: InitialState = initialState , action: ActionType): InitialState => {
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
export default authReducer