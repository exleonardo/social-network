import {follow , followSuccess , toggleFollowingProgress , unfollow , unfollowSuccess} from "./users-reducer";
import {usersAPI} from "../API/users-api";
import {Response , ResultCode} from "../API/api";


jest.mock ( "../API/users-api" )
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const getStateMock = jest.fn ()
const dispatchMock = jest.fn ()
beforeEach ( () => {
  dispatchMock.mockClear ()
  getStateMock.mockClear ()
  userAPIMock.follow.mockClear ()
  userAPIMock.unfollow.mockClear ()
} )

const result: Response = {
  resultCode: ResultCode.Sucsess ,
  messages: [] ,
  data: {} ,
  fieldsErrors: []
}


test ( 'follow thunk' , async () => {
  userAPIMock.follow.mockReturnValue ( Promise.resolve ( result ) )
  const thunk = follow ( 1 )

  await thunk ( dispatchMock , getStateMock , {} )
  expect ( dispatchMock ).toBeCalledTimes ( 3 )
  expect ( dispatchMock ).toHaveBeenNthCalledWith ( 1 , toggleFollowingProgress ( true , 1 ) )
  expect ( dispatchMock ).toHaveBeenNthCalledWith ( 2 , followSuccess ( 1 ) )
  expect ( dispatchMock ).toHaveBeenNthCalledWith ( 3 , toggleFollowingProgress ( false , 1 ) )
} )

test ( 'unfollow thunk' , async () => {
  userAPIMock.unfollow.mockReturnValue ( Promise.resolve ( result ) )
  const thunk = unfollow ( 1 )

  await thunk ( dispatchMock , getStateMock , {} )
  expect ( dispatchMock ).toBeCalledTimes ( 3 )
  expect ( dispatchMock ).toHaveBeenNthCalledWith ( 1 , toggleFollowingProgress ( true , 1 ) )
  expect ( dispatchMock ).toHaveBeenNthCalledWith ( 2 , unfollowSuccess ( 1 ) )
  expect ( dispatchMock ).toHaveBeenNthCalledWith ( 3 , toggleFollowingProgress ( false , 1 ) )
} )