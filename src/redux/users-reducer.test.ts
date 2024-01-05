import usersReducer , {followSuccess , unfollowSuccess , UsersType} from "./users-reducer";

let initialState: UsersType
beforeEach ( () => {
  initialState = {
    users: [{
      id: 0 ,
      photos: { small: null , large: null } ,
      followed: false ,
      name: 'Alex' ,
      status: 'status test'
    } , {
      id: 1 ,
      photos: { small: null , large: null } ,
      followed: false ,
      name: 'Artem' ,
      status: 'status test one'
    } , {
      id: 2 ,
      photos: { small: null , large: null } ,
      followed: true ,
      name: 'Nekit' ,
      status: 'status test two'
    } , {
      id: 3 ,
      photos: { small: null , large: null } ,
      followed: true ,
      name: 'Alexander' ,
      status: 'status test three'
    }] ,
    pageSize: 5 ,
    totalUsersCount: 1 ,
    currentPage: 1 ,
    isFetching: false ,
    followingInProgress: []
  }
} )

test ( 'follow success' , () => {

  const newState = usersReducer ( initialState , followSuccess ( 1 ) )
  expect ( newState.users[0].followed ).toBeFalsy ()
  expect ( newState.users[1].followed ).toBeTruthy ()
} )

test ( 'unfollow success' , () => {

  const newState = usersReducer ( initialState , unfollowSuccess ( 3 ) )
  expect ( newState.users[2].followed ).toBeTruthy ()
  expect ( newState.users[3].followed ).toBeFalsy ()
} )