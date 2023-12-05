import {instance , ResponseType} from "./api";
import {UsersInfoType} from "./profile-api";

type UserData = {
  items: UsersInfoType[],
  totalCount: number;
  error: string;
}

export const usersAPI = {
  getUsers(currentPage: number = 1 , pageSize: number = 5) {
    return instance.get<UserData> ( `users/?page=${currentPage}&count=${pageSize}` ).then ( res => res.data )
  } ,
  follow(userId: number) {
    return instance.post<ResponseType> ( `follow/${userId}` )
  } ,
  unfollow(userId: number) {
    return instance.delete<ResponseType> ( `follow/${userId}` )
  }
}