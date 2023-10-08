import {socialNetworkAPI , UsersInfoType} from "../API/socialNetworkAPI";
import {AppThunk} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'
export type UserReducerActionType =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

type UsersType = {
    users: UsersInfoType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>
}
const initialState: UsersType = {
    users: [] ,
    pageSize: 5 ,
    totalUsersCount: 1 ,
    currentPage: 1 ,
    isFetching: false ,
    followingInProgress: []
}
const usersReducer = (state: UsersType = initialState , action: UserReducerActionType): UsersType => {

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
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state ,
                followingInProgress: action.isFetching ? [...state.followingInProgress , action.userId] : state.followingInProgress.filter ( id => id !== action.userId )
            }
        default :
            return state
    }
};

export const followSuccess = (userId: number) => ({ type: FOLLOW , userId } as const)
export const unfollowSuccess = (userId: number) => ({ type: UNFOLLOW , userId } as const)
export const setUsers = (users: UsersInfoType[]) => ({ type: SET_USERS , users } as const)
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE , currentPage } as const)
export const setUsersTotalCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT ,
    totalUsersCount
}) as const
export const toggleIsFetching = (isFetching: boolean) => {
    return ({ type: TOGGLE_IS_FETCHING , isFetching }) as const
}
export const toggleFollowingProgress = (isFetching: boolean , userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS , isFetching , userId
} as const)
export const requesUsers = (currentPage: number = 1 , pageSize: number = 5): AppThunk => async dispatch => {
    dispatch ( toggleIsFetching ( true ) )
    dispatch ( setCurrentPage ( currentPage ) )
    const data = await socialNetworkAPI.getUsers ( currentPage , pageSize )
    dispatch ( setUsers ( data.items ) )
    dispatch ( setUsersTotalCount ( data.totalCount ) )
    dispatch ( toggleIsFetching ( false ) )
}
export const follow = (userId: number): AppThunk => {
    return async dispatch => {
        dispatch ( toggleFollowingProgress ( true , userId ) )
        const res = await socialNetworkAPI.unfollow ( userId )
        if ( res.data.resultCode === 0 ) dispatch ( unfollowSuccess ( userId ) )
        dispatch ( toggleFollowingProgress ( false , userId ) )

    };
}
export const unfollow = (userId: number): AppThunk => {
    return async dispatch => {
        dispatch ( toggleFollowingProgress ( true , userId ) )
        const res = await socialNetworkAPI.follow ( userId )
        if ( res.data.resultCode === 0 ) dispatch ( followSuccess ( userId ) )
        dispatch ( toggleFollowingProgress ( false , userId ) )
    };
}

export default usersReducer;