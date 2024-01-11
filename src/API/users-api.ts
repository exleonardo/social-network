import { Response, instance } from './api'
import { UsersInfoType } from './profile-api'

export const usersAPI = {
  follow(userId: number) {
    return instance.post<Response>(`follow/${userId}`).then(res => res.data)
  },
  getUsers(currentPage: number = 1, pageSize: number = 5, term: string = '', friend: string = '') {
    return instance
      .get<UserData>(
        `users/?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === '' ? '' : `&friend=${friend}`)
      )
      .then(res => res.data)
  },
  unfollow(userId: number) {
    return instance.delete<Response>(`follow/${userId}`).then(res => res.data)
  },
}

type UserData = {
  error: string
  items: UsersInfoType[]
  totalCount: number
}
