import {instance} from "./api";

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<{ url: string }> ( 'security/get-captcha-url' )
  }
}