import axios from "axios";


const setting = {
    headers: {
        "API-KEY": "f3eb22c4-26f8-436d-a4bb-37315a600abf"
    } ,
    withCredentials: true ,
}

export type UsersContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileUserType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: UsersContactType
    photos: {
        small: string
        large: string
    }
}
type DataAuthMe = {
    id: number,
    login: string,
    email: string
}
type AuthMeType = {
    data: DataAuthMe,
    "messages": [],
    "fieldsErrors": [],
    "resultCode": number
}
type ResponseType<D = {}> = {
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
    photos: {
        small: string | null;
        large: string | null;
    }
    followed: boolean;
    name: string;
    status: string;
}

const instance = axios.create ( { baseURL: "https://social-network.samuraijs.com/api/1.0/" , ...setting } )

export const socialNetworkAPI = {
    getUsers(currentPage: number = 1 , pageSize: number = 5) {
        return instance.get<UserDataType> ( `users/?page=${currentPage}&count=${pageSize}` ).then ( res => res.data )
    } ,
    getAuthMe() {
        return instance.get<AuthMeType> ( `auth/me` )
    } ,
    follow(userId: number) {
        return instance.post<ResponseType> ( `follow/${userId}` )
    } ,
    unfollow(userId: number) {
        return instance.delete<ResponseType> ( `follow/${userId}` )
    }
}
export const profileAPI = {
    getProfileUser(userId: string) {
        return instance.get<ProfileUserType> ( `profile/${userId}/` )
    } ,
    getStatus(userId: string) {
        return instance.get<string> ( `profile/status/${userId}` )
    } ,
    updateStatus(status: string) {
        return instance.put<ResponseType> ( `profile/status/` , { status: status } )
    }
}