const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
type ActionType = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>

export type UsersInfoType = {
    id: number,
    photos: {
        small: string | null;
        large: string | null;
    }
    followed: boolean;
    name: string;
    status: string;
}
type UsersType = {
    users: UsersInfoType[]
}
const initialState: UsersType = {
    users: []
}
const usersReducer = (state: UsersType = initialState , action: ActionType): UsersType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state ,
                users: state.users.map ( el => el.id === action.userId ? { ...el , followed: true } : el )
            }
        case UNFOLLOW:
            return {
                ...state ,
                users: state.users.map ( el => el.id === action.userId ? { ...el , followed: false } : el )
            }
        case SET_USERS:
            return { ...state , users: [...state.users , ...action.users] }
        default :
            return state
    }
};

export const followAC = (userId: number) => {
    return {
        type: FOLLOW ,
        userId
    } as const
}
export const unfollowAC = (userId: number) => {
    return {
        type: UNFOLLOW ,
        userId
    } as const
}
export const setUsersAC = (users: UsersInfoType[]) => {
    return {
        type: SET_USERS ,
        users
    } as const
}
export default usersReducer;