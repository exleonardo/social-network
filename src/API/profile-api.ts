import { UploadFile } from 'antd'

import { Response, instance } from './api'

export const profileAPI = {
  getProfileUser(userId: null | string) {
    return instance.get<ProfileUserType>(`profile/${userId}/`)
  },
  getStatus(userId: string) {
    return instance.get<string>(`profile/status/${userId}`)
  },
  savePhoto(photo: UploadFile) {
    return instance.put<Response<ProfilePhotos>>('profile/photo/', photo, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  saveProfile(profile: ProfileDataFormType) {
    return instance.put<Response>(`profile`, profile)
  },
  updateStatus(status: string) {
    return instance.put<Response>(`profile/status/`, { status: status })
  },
}

//Types
export type UsersContactType = {
  facebook: null | string
  github: null | string
  instagram: null | string
  mainLink: null | string
  twitter: null | string
  vk: null | string
  website: null | string
  youtube: null | string
}
export type ProfileUserType = {
  aboutMe: string
  contacts: UsersContactType
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  photos: ProfilePhotos
  userId: null | string
}
export type ProfilePhotos = {
  large: null | string
  small: null | string
}
export type UsersInfoType = {
  followed: boolean
  id: number
  name: string
  photos: ProfilePhotos
  status: string
}
export type ProfileDataFormType = {
  aboutMe: string
  contacts: {
    facebook: null | string
    github: null | string
    instagram: null | string
    mainLink: null | string
    twitter: null | string
    vk: null | string
    website: null | string
    youtube: null | string
  }
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
}
