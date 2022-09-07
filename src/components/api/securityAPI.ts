import { instance } from './DAL';


type GetCaptcha = {
    url: string
}

export const securityauthAPI = {
    getCaptcha() {
        return instance.get<GetCaptcha>('security/get-captcha-url')
    }
}