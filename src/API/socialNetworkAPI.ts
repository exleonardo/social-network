import axios from "axios";


const setting = {
    headers: {
        "API-KEY": "f3eb22c4-26f8-436d-a4bb-37315a600abf"
    } ,
    withCredentials: true ,
}

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
type DataAuthMe = {
    id: number,
    login: string,
    email: string
}
type AuthMeType = {
    data: DataAuthMe,
    messages: [],
    fieldsErrors: [],
    resultCode: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type UserDataType = {
    items: UsersInfoType[],
    totalCount: number;
    error: string;
}
export type UsersInfoType = {
    id: number,
    photos: ProfilePhotos
    followed: boolean;
    name: string;
    status: string;
}

const instance = axios.create ( { baseURL: "https://social-network.samuraijs.com/api/1.0/" , ...setting } )

export const socialNetworkAPI = {
    getUsers(currentPage: number = 1 , pageSize: number = 5) {
        return instance.get<UserDataType> ( `users/?page=${currentPage}&count=${pageSize}` ).then ( res => res.data )
    } ,
    follow(userId: number) {
        return instance.post<ResponseType> ( `follow/${userId}` )
    } ,
    unfollow(userId: number) {
        return instance.delete<ResponseType> ( `follow/${userId}` )
    }
}
export const profileAPI = {
    getProfileUser(userId: number | null) {
        return instance.get<ProfileUserType> ( `profile/${userId}/` )
    } ,
    getStatus(userId: string) {
        return instance.get<string> ( `profile/status/${userId}` )
    } ,
    updateStatus(status: string) {
        return instance.put<ResponseType> ( `profile/status/` , { status: status } )
    } ,
    savePhoto(photo: File) {
        const formDate = new FormData ();
        formDate.append ( 'image' , photo )
        return instance.put<ResponseType<ProfilePhotos>> ( 'profile/photo/' , formDate , { headers: { 'Content-Type': 'multipart/form-data' } } )
    } ,
    saveProfile(profile: ProfileUserType) {
        return instance.put<ResponseType> ( `profile` , profile )
    }

}
export const authAPI = {
    me() {
        return instance.get<AuthMeType> ( `auth/me` )
    } ,
    login(email: string , password: string , rememberMe: boolean = false) {
        return instance.post<ResponseType<{ userId: number }>> ( 'auth/login' , {
            email: email ,
            password: password ,
            rememberMe: rememberMe
        } );
    } ,
    logOut() {
        return instance.delete<ResponseType> ( 'auth/login' );
    }

}