import axios, { AxiosResponse } from "axios";
import { ProfileType } from './../../redux/postsReducer';



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a2ec01d2-5f96-4427-b1e7-501009c51c19"
    }
});


export const getUsersAPI = {
    getUsers(currentPage = 1, pageSize: string) {

        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)


    },


}
type PromiseResponse = {
    resultCode: number
    messages: Array<string>
}


export const profileAPI = {
    getUsersStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateUsersStatus(userStatus: string) {
        return instance.put(`profile/status`, {
            status: userStatus
        })
    },

    getUsersProfile(userId: number) {
        return instance.get(`profile/${userId}`)

    },
    updateUserProfile(profile: ProfileType): Promise<AxiosResponse<PromiseResponse>> {
        return instance.put(`profile`, profile)

    },

    getFollow(id: number) {
        return instance.post(`follow/${id}`).then(response => response.data)

    },
    getUnFollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data)

    },
    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData,
            { headers: { "Content-Type": "multipart/form-data" } }).then(response => response.data)
    }
}

export enum ResultCodes {
    Success = 0,
    Captcha = 10

}

export type GetAuthMe = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>

}

type LogIn = {
    email: string
    password: string
    rememberMe?: boolean
    captcha: string | null
    resultCode: ResultCodes
    messages: Array<any>

}

type GetCaptcha = {
    url: string
}

export const authAPI = {
    getAuthMe() {

        return instance.get<GetAuthMe>('auth/me').then(res => res.data)

    },
    logIn(email: string, password: string, captcha: string | null = null) {
        return instance.post<LogIn>('auth/login', {
            email,
            password,
            captcha,
        })

    },
    logOut() {
        return instance.delete('auth/login')
    }
}


export const securityauthAPI = {
    getCaptcha() {
        return instance.get<GetCaptcha>('security/get-captcha-url')
    }

}


