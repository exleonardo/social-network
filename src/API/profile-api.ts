import {instance , Response} from "./api";

export const profileAPI = {
  getProfileUser(userId: number | null) {
    return instance.get<ProfileUserType> ( `profile/${userId}/` )
  } ,
  getStatus(userId: string) {
    return instance.get<string> ( `profile/status/${userId}` )
  } ,
  updateStatus(status: string) {
    return instance.put<Response> ( `profile/status/` , { status: status } )
  } ,
  savePhoto(photo: File) {
    const formDate = new FormData ();
    formDate.append ( 'image' , photo )
    return instance.put<Response<ProfilePhotos>> ( 'profile/photo/' , formDate , { headers: { 'Content-Type': 'multipart/form-data' } } )
  } ,
  saveProfile(profile: ProfileUserType) {
    return instance.put<Response> ( `profile` , profile )
  }

}

//Types
export type UsersContactType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}
export type ProfileUserType = {
  aboutMe: string;
  userId: number | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: UsersContactType;
  photos: ProfilePhotos
}
export type ProfilePhotos = {
  small: string | null
  large: string | null
}
export type UsersInfoType = {
  id: number,
  photos: ProfilePhotos
  followed: boolean;
  name: string;
  status: string;
}