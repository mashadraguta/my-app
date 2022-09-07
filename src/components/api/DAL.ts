import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a2ec01d2-5f96-4427-b1e7-501009c51c19"
    }
});


export enum ResultCodes {
    Success = 0,
    Captcha = 10
}

export type ResponseType<D = {}, RC = ResultCodes> = {
    data: D,
    messages: Array<string>
    resultCode: RC
}


