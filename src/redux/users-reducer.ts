import {Response , ResultCode} from "../API/api";
import {AppDispatchType , AppThunk} from "./redux-store";
import {updateObjectInArray} from "../utils/object-helpers";
import {usersAPI} from "../API/users-api";
import {UsersInfoType} from "../API/profile-api";


const initialState = {
  users: [] ,
  pageSize: 5 ,
  totalUsersCount: 1 ,
  currentPage: 1 ,
  isFetching: false ,
  followingInProgress: [] ,
  filter: {
    term: '' ,
    friend: ''
  }
}
const usersReducer = (state: UsersType = initialState , action: UserReducerActionType): UsersType => {

  switch (action.type) {
    case "USERS/FOLLOW":
      return {
        ...state ,
        users: updateObjectInArray ( state.users , action.userId , { followed: true } )
      }
    case "USERS/UNFOLLOW":
      return {
        ...state ,
        users: updateObjectInArray ( state.users , action.userId , { followed: false } )
      }
    case "USERS/SET-USERS":
      return { ...state , users: action.users }
    case 'USERS/SET-CURRENT-PAGE':
      return { ...state , currentPage: action.currentPage }
    case 'USERS/SET-TOTAL-USERS-COUNT':
      return { ...state , totalUsersCount: action.totalUsersCount }
    case 'USERS/TOGGLE-IS-FETCHING':
      return { ...state , isFetching: action.isFetching }
    case "USERS/SET-FILTER":
      return {
        ...state , filter: action.payload
      }
    case 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS':
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
  return ({ type: 'USERS/TOGGLE-IS-FETCHING' , isFetching } as const)
}
export const toggleFollowingProgress = (isFetching: boolean , userId: number) => ({
  type: 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS' , isFetching , userId
} as const)
export const followSuccess = (userId: number) => ({ type: "USERS/FOLLOW" , userId } as const)
export const unfollowSuccess = (userId: number) => ({ type: "USERS/UNFOLLOW" , userId } as const)
export const setUsers = (users: UsersInfoType[]) => ({ type: "USERS/SET-USERS" , users } as const)
export const setCurrentPage = (currentPage: number) => ({ type: 'USERS/SET-CURRENT-PAGE' , currentPage } as const)
export const setUsersTotalCount = (totalUsersCount: number) => ({
  type: 'USERS/SET-TOTAL-USERS-COUNT' ,
  totalUsersCount
} as const)
export const setFilter = (filter: FormValues) => ({
  type: 'USERS/SET-FILTER' ,
  payload: filter
} as const)

//Thunk
export const requestUsers = (currentPage: number = 1 , pageSize: number = 5 , filter: FormValues): AppThunk => async dispatch => {
  dispatch ( toggleIsFetching ( true ) )
  dispatch ( setCurrentPage ( currentPage ) )
  dispatch ( setFilter ( filter ) )

  const data = await usersAPI.getUsers ( currentPage , pageSize , filter.term , filter.friend )
  dispatch ( setUsers ( data.items ) )
  dispatch ( setUsersTotalCount ( data.totalCount ) )
  dispatch ( toggleIsFetching ( false ) )
}

const followUnfollowFlow = async (dispatch: AppDispatchType , userId: number , apiMethod: (userId: number) => Promise<Response> , actionCreator: (userId: number) => UserReducerActionType) => {

  dispatch ( toggleFollowingProgress ( true , userId ) )
  const res = await apiMethod ( userId )
  if ( res.resultCode === ResultCode.Sucsess ) {
    dispatch ( actionCreator ( userId ) )
  }
  dispatch ( toggleFollowingProgress ( false , userId ) )
}
export const follow = (userId: number): AppThunk => async dispatch => {
  return await followUnfollowFlow ( dispatch , userId , usersAPI.follow.bind ( usersAPI ) , followSuccess )
}
export const unfollow = (userId: number): AppThunk => async dispatch => {
  await followUnfollowFlow ( dispatch , userId , usersAPI.unfollow.bind ( usersAPI ) , unfollowSuccess )
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
  | ReturnType<typeof setFilter>


export type FormValues = {
  term: string
  friend: string
}
export type UsersType = {
  users: UsersInfoType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>,
  filter: FormValues
}
