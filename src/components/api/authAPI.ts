import { instance, ResponseType, ResultCodes } from "./DAL"


type ResDataLogIn = {
    email: string
    password: string
    rememberMe?: boolean
    captcha: string | null
}

type ResDataAuth = {
    id: number
    email: string
    login: string
}


export const authAPI = {
    async getAuthMe() {
        const res = await instance.get<ResponseType<ResDataAuth>>('auth/me')
        return res.data
    },
    logIn(email: string, password: string, captcha: string | null = null) {
        return instance.post<ResponseType<ResDataLogIn>>('auth/login', {
            email,
            password,
            captcha,
        })

    },
    logOut() {
        return instance.delete('auth/login')
    }
}

