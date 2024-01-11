import profileReducer, {
  addPostActionCreator,
  setStatusAC,
  setUserProfile,
} from './profile-reducer'
import { ProfilePageType } from './store'

let startState: ProfilePageType

beforeEach(() => {
  startState = {
    newPostText: 'It-kamasutra.com',
    posts: [
      { id: 1, likesCount: '1', message: 'Hi how are you' },
      { id: 2, likesCount: '23', message: "It's my post " },
    ],
    profile: null,
    status: '',
  }
})
test('message should be added to correct post', () => {
  const action = addPostActionCreator('test message')
  const endState = profileReducer(startState, action)

  expect(endState.posts.length).toEqual(3)
  expect(endState.posts[endState.posts.length - 1].id).toBeDefined()
  expect(endState.posts[endState.posts.length - 1].message).toBe('test message')
})
test('status should be changed', () => {
  const action = setStatusAC('New status')
  const endState = profileReducer(startState, action)

  expect(endState.status).toBeDefined()
  expect(endState.status).toBe('New status')
})
test('users should be added', () => {
  const action = setUserProfile({
    aboutMe: 'student',
    contacts: {
      facebook: 'undefined',
      github: 'https://github.com/exleonardo',
      instagram: '@Alexander_Khomenok',
      mainLink: 'undefined',
      twitter: 'undefined',
      vk: 'vk.com/exleonardo',
      website: 'undefined',
      youtube: 'undefined',
    },
    fullName: 'Alex Khomenok',
    lookingForAJob: true,
    lookingForAJobDescription: 'Ищу работу Frontend-react-dev',
    photos: {
      large: 'No Photo',
      small: 'No Photo',
    },
    userId: '1',
  })
  const endState = profileReducer(startState, action)

  expect(endState.profile).toBeDefined()
  expect(endState.profile?.fullName).toBe('Alex Khomenok')
  expect(endState.profile?.lookingForAJob).toBeTruthy()
  expect(endState.profile?.userId).toBeDefined()
})
