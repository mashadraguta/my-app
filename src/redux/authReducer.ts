
import { Dispatch } from "redux";
//import { authAPI, securityauthAPI } from "../components/api/DAL";


const { authAPI, securityauthAPI } = require("../components/api/DAL");



// export type AuthInitialState = {
//     id?: number | null,
//     email?: string | null,
//     login?: string | null,
//     isAuth?: boolean,
//     isFetching?: boolean,
//     captcha?: string | null,

// }

let initialState = {
    id: 0,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: false,
    captcha: null as string | null,
}
type AuthInitialState = typeof initialState

export enum AuthActionTypes {
    SET_USER_DATA = 'SET_USER_DATA',
    GET_CAPTCHA = 'GET_CAPTCHA'
}


interface PayloadUserData {
    id?: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

interface SetUserData {
    type: AuthActionTypes.SET_USER_DATA
    payload: PayloadUserData
}
interface GetCaptcha {
    type: AuthActionTypes.GET_CAPTCHA
    payload: { captcha: string | null }
}

// Uncaught Error: The slice reducer for key "auth" returned undefined during initialization. 
// If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. 
// If you don't want to set a value for this reducer, you can use null instead of undefined.
export type ActionUserType = SetUserData | GetCaptcha

const authReducer = (state = initialState, action: any): AuthInitialState => {

    switch (action.type) {

        case AuthActionTypes.SET_USER_DATA:
        case AuthActionTypes.GET_CAPTCHA:

            return {
                ...state,
                ...action.payload,

            }

        default:
            return state;
    }
}
//'{ id: number; email: null; login: null; isAuth: boolean; isFetching: boolean; captcha: null; }'.

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {
        type: 'SET_USER_DATA',
        payload: { id, email, login, isAuth }
    })
export const getCaptchaAC = (captcha: string | null) => (
    {
        type: 'GET_CAPTCHA',
        payload: { captcha },
    })


export const authenticationThunkCreator = () => {
    return async (dispatch: Dispatch<ActionUserType>) => {
        const response = await authAPI.getAuthMe();
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch({
                type: AuthActionTypes.SET_USER_DATA,
                payload: { id, login, email, isAuth: true }
            })
            // dispatch(setAuthUserData({ id, email, login, true}));
        }
    }
}


export interface TypelogInThunkCreator {
    email: string | null
    password: string | null
    captcha?: string | null
    setFieldValue: (arg: string, arg2: string) => string
}


export const logInThunkCreator = (email: string, password: string, captcha: boolean, setFieldValue: (arg: string, arg2: string) => string) => {
    return async (dispatch: any) => {
        const response = await authAPI.logIn(email, password, captcha)
        if (response.data.resultCode === 0) {

            dispatch(authenticationThunkCreator());
        }
        else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaThunkCreator())

            }
            setFieldValue("general", response.data.messages.map((item: any) => item))
        }



    }
}
export const getCaptchaThunkCreator = () => {
    return async (dispatch: Dispatch<ActionUserType>) => {
        const response = await securityauthAPI.getCaptcha();
        const captcha = response.data.url;
        dispatch({ type: AuthActionTypes.GET_CAPTCHA, payload: { captcha } })

    }

}


export const logOutThunkCreator = () => {
    return async (dispatch: Dispatch<ActionUserType>) => {
        const response = await authAPI.logOut();
        if (response.data.resultCode === 0) {
            dispatch({
                type: AuthActionTypes.SET_USER_DATA,
                payload: { id: null, login: null, email: null, isAuth: false }
            })
        }
    }
}


export default authReducer;
