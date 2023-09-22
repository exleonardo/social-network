import axios from "axios";


const setting = {
    headers: {
        "API-KEY": "f3eb22c4-26f8-436d-a4bb-37315a600abf"
    } ,
    withCredentials: true ,
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
const instanse = axios.create ( { baseURL: "https://social-network.samuraijs.com/api/1.0/" , ...setting } )

export const socialNetworkAPI = {
    getProfileUser(userId: string) {
        return instanse.get<ProfileUserType> ( `profile/${userId}/` )
    }
}