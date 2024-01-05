import {instance , Response} from "./api";
import {UsersInfoType} from "./profile-api";


export const usersAPI = {
  getUsers(currentPage: number = 1 , pageSize: number = 5) {
    return instance.get<UserData> ( `users/?page=${currentPage}&count=${pageSize}` ).then ( res => res.data )
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