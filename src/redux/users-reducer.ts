import {Response , ResultCode} from "../API/api";
import {AppDispatchType , AppThunk} from "./redux-store";
import {AxiosResponse} from "axios";
import {updateObjectInArray} from "../utils/object-helpers";
import {usersAPI} from "../API/users-api";
import {UsersInfoType} from "../API/profile-api";

const FOLLOW = "USERS/FOLLOW";
const UNFOLLOW = "USERS/UNFOLLOW";
const SET_USERS = "USERS/SET-USERS";
const SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE';
const TOGGLE_IS_FETCHING = 'USERS/TOGGLE-IS-FETCHING';
const SET_TOTAL_USERS_COUNT = 'USERS/SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS';

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
        users: updateObjectInArray ( state.users , action.userId , { followed: true } )
      }
    case UNFOLLOW:
      return {
        ...state ,
        users: updateObjectInArray ( state.users , action.userId , { followed: false } )
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
//Actions
export const toggleIsFetching = (isFetching: boolean) => {
  return ({ type: TOGGLE_IS_FETCHING , isFetching } as const)
}
export const toggleFollowingProgress = (isFetching: boolean , userId: number) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS , isFetching , userId
} as const)
export const followSuccess = (userId: number) => ({ type: FOLLOW , userId } as const)
export const unfollowSuccess = (userId: number) => ({ type: UNFOLLOW , userId } as const)
export const setUsers = (users: UsersInfoType[]) => ({ type: SET_USERS , users } as const)
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE , currentPage } as const)
export const setUsersTotalCount = (totalUsersCount: number) => ({
  type: SET_TOTAL_USERS_COUNT ,
  totalUsersCount
} as const)

//Thunk
export const requesUsers = (currentPage: number = 1 , pageSize: number = 5): AppThunk => async dispatch => {
  dispatch ( toggleIsFetching ( true ) )
  dispatch ( setCurrentPage ( currentPage ) )
  const data = await usersAPI.getUsers ( currentPage , pageSize )
  dispatch ( setUsers ( data.items ) )
  dispatch ( setUsersTotalCount ( data.totalCount ) )
  dispatch ( toggleIsFetching ( false ) )
}

const followUnfollowFlow = async (dispatch: AppDispatchType , userId: number , apiMethod: (userId: number) => Promise<AxiosResponse<Response>> , actionCreator: (userId: number) => UserReducerActionType) => {
  dispatch ( toggleFollowingProgress ( true , userId ) )
  const res = await apiMethod ( userId )
  if ( res.data.resultCode === ResultCode.Sucsess ) dispatch ( actionCreator ( userId ) )
  dispatch ( toggleFollowingProgress ( false , userId ) )
}
export const follow = (userId: number): AppThunk => async dispatch => {
  await followUnfollowFlow ( dispatch , userId , usersAPI.unfollow.bind ( usersAPI ) , unfollowSuccess )
}
export const unfollow = (userId: number): AppThunk => async dispatch => {
  await followUnfollowFlow ( dispatch , userId , usersAPI.follow.bind ( usersAPI ) , followSuccess )
};


export default usersReducer;
//Types
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