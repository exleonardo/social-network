import {instance , Response} from "./api";
import {UsersInfoType} from "./profile-api";


export const usersAPI = {
  getUsers(currentPage: number = 1 , pageSize: number = 5 , term: string = '' , friend: string = '') {
    return instance.get<UserData> ( `users/?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === '' ? '' : `&friend=${friend}`) ).then ( res => res.data )
  } ,
  follow(userId: number) {
    return instance.post<Response> ( `follow/${userId}` ).then ( res => res.data )
  } ,
  unfollow(userId: number) {
    return instance.delete<Response> ( `follow/${userId}` ).then ( res => res.data )
  }
}

type UserData = {
  items: UsersInfoType[],
  totalCount: number;
  error: string;
}