import usersReducer, { UsersType, followSuccess, unfollowSuccess } from './users-reducer'

let initialState: UsersType

beforeEach(() => {
  initialState = {
    currentPage: 1,
    filter: {
      friend: '',
      term: '',
    },
    followingInProgress: [],
    isFetching: false,
    pageSize: 5,
    totalUsersCount: 1,
    users: [
      {
        followed: false,
        id: 0,
        name: 'Alex',
        photos: { large: null, small: null },
        status: 'status test',
      },
      {
        followed: false,
        id: 1,
        name: 'Artem',
        photos: { large: null, small: null },
        status: 'status test one',
      },
      {
        followed: true,
        id: 2,
        name: 'Nekit',
        photos: { large: null, small: null },
        status: 'status test two',
      },
      {
        followed: true,
        id: 3,
        name: 'Alexander',
        photos: { large: null, small: null },
        status: 'status test three',
      },
    ],
  }
})

test('follow success', () => {
  const newState = usersReducer(initialState, followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
  const newState = usersReducer(initialState, unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})
