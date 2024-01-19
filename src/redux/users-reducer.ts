import { Response, ResultCode } from '@/API/api'
import { UsersInfoType } from '@/API/profile-api'
import { usersAPI } from '@/API/users-api'
import { AppThunk } from '@/app/redux-store'
import { updateObjectInArray } from '@/utils/object-helpers'
import { Dispatch } from 'redux'

const initialState = {
  currentPage: 1,
  filter: {
    friend: '',
    term: '',
  },
  followingInProgress: [],
  isFetching: false,
  pageSize: 5,
  totalUsersCount: 1,
  users: [],
}
const usersReducer = (
  state: UsersType = initialState,
  action: UserReducerActionType
): UsersType => {
  switch (action.type) {
    case 'USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, {
          followed: true,
        }),
      }
    case 'USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, {
          followed: false,
        }),
      }
    case 'USERS/SET-USERS':
      return { ...state, users: action.users }
    case 'USERS/SET-CURRENT-PAGE':
      return { ...state, currentPage: action.currentPage }
    case 'USERS/SET-TOTAL-USERS-COUNT':
      return { ...state, totalUsersCount: action.totalUsersCount }
    case 'USERS/TOGGLE-IS-FETCHING':
      return { ...state, isFetching: action.isFetching }
    case 'USERS/SET-FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    case 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId),
      }
    default:
      return state
  }
}

//Actions
export const toggleIsFetching = (isFetching: boolean) => {
  return { isFetching, type: 'USERS/TOGGLE-IS-FETCHING' } as const
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
  ({
    isFetching,
    type: 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS',
    userId,
  }) as const
export const followSuccess = (userId: number) => ({ type: 'USERS/FOLLOW', userId }) as const
export const unfollowSuccess = (userId: number) => ({ type: 'USERS/UNFOLLOW', userId }) as const
export const setUsers = (users: UsersInfoType[]) => ({ type: 'USERS/SET-USERS', users }) as const
export const setCurrentPage = (currentPage: number) =>
  ({ currentPage, type: 'USERS/SET-CURRENT-PAGE' }) as const
export const setUsersTotalCount = (totalUsersCount: number) =>
  ({
    totalUsersCount,
    type: 'USERS/SET-TOTAL-USERS-COUNT',
  }) as const
export const setFilter = (filter: FormValues) =>
  ({
    payload: filter,
    type: 'USERS/SET-FILTER',
  }) as const

//Thunk
export const requestUsers =
  (currentPage: number = 1, pageSize: number = 5, filter: FormValues): AppThunk =>
  async dispatch => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    dispatch(setFilter(filter))

    const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

    dispatch(setUsers(data.items))
    dispatch(setUsersTotalCount(data.totalCount))
    dispatch(toggleIsFetching(false))
  }

const followUnfollowFlow = async (
  dispatch: Dispatch,
  userId: number,
  apiMethod: (userId: number) => Promise<Response>,
  actionCreator: (userId: number) => UserReducerActionType
) => {
  dispatch(toggleFollowingProgress(true, userId))
  try {
    const res = await apiMethod(userId)

    if (res.resultCode === ResultCode.Sucsess) {
      dispatch(actionCreator(userId))
      dispatch(toggleFollowingProgress(false, userId))

      return Promise.resolve()
    }
  } catch (error) {
    /* empty */
  }
}

export const follow =
  (userId: number): AppThunk =>
  async dispatch => {
    return await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
  }
export const unfollow =
  (userId: number): AppThunk =>
  async dispatch => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }

export default usersReducer
//Types
export type UserReducerActionType =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setFilter>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setUsersTotalCount>
  | ReturnType<typeof toggleFollowingProgress>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof unfollowSuccess>

export type FormValues = {
  friend: string
  term: string
}
export type UsersType = {
  currentPage: number
  filter: FormValues
  followingInProgress: Array<number>
  isFetching: boolean
  pageSize: number
  totalUsersCount: number
  users: UsersInfoType[]
}
