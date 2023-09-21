const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
type ActionType =
    ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>

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
    users: UsersInfoType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
}
const initialState: UsersType = {
    users: [] ,
    pageSize: 5 ,
    totalUsersCount: 1 ,
    currentPage: 1 ,
    isFetching: false
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
            return { ...state , users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state , currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state , totalUsersCount: action.totalUsersCount }
        case TOGGLE_IS_FETCHING:
            return { ...state , isFetching: action.isFetching }
        default :
            return state
    }
};

export const follow = (userId: number) => ({ type: FOLLOW , userId }) as const
export const unfollow = (userId: number) => ({ type: UNFOLLOW , userId }) as const
export const setUsers = (users: UsersInfoType[]) => ({ type: SET_USERS , users }) as const
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE , currentPage }) as const
export const setUsersTotalCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT ,
    totalUsersCount
}) as const
export const toggleIsFetching = (isFetching: boolean) => {
    return ({ type: TOGGLE_IS_FETCHING , isFetching }) as const
}
export default usersReducer;