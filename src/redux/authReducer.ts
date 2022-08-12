import { ResultCodes } from './../components/api/DAL';
import { RootStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { AxiosResponse } from 'axios';
import { GetAuthMe } from '../components/api/DAL';

import { authAPI, securityauthAPI } from "../components/api/DAL"



// export type AuthInitialState = {
//     id?: number | null,
//     email?: string | null,
//     login?: string | null,
//     isAuth?: boolean,
//     isFetching?: boolean,
//     captcha?: string | null,

// }

let initialState = {
    id: 0 as number | null,
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


type PayloadUserData = {

    id?: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetUserData = {
    type: AuthActionTypes.SET_USER_DATA
    payload: PayloadUserData
}
type GetCaptcha = {
    type: AuthActionTypes.GET_CAPTCHA
    payload: { captcha: string | null }
}

export interface TypelogInThunkCreator {
    email: string | null
    password: string | null
    captcha?: string | null
    setFieldValue: (arg: string, arg2: Array<string>) => string
}

// Uncaught Error: The slice reducer for key "auth" returned undefined during initialization. 
// If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. 
// If you don't want to set a value for this reducer, you can use null instead of undefined.
//export type ActionUserType = SetUserData | GetCaptcha

type ActionUsersType = GetCaptcha | SetUserData
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionUsersType>


const authReducer = (state = initialState, action: ActionUsersType): AuthInitialState => {

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


export const authenticationThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const dataMe = await authAPI.getAuthMe();

        if (dataMe.resultCode === ResultCodes.Success) {
            let { id, login, email } = dataMe.data;
            dispatch({
                type: AuthActionTypes.SET_USER_DATA,
                payload: { id, login, email, isAuth: true }
            })
            // dispatch(setAuthUserData({ id, email, login, true}));
        }
    }
}




export const logInThunkCreator = (email: string,
    password: string,
    captcha: string,
    setFieldValue:  (field: string, value: any, shouldValidate?: boolean | undefined) => void): ThunkType => {
    return async (dispatch) => {

        const response = await authAPI.logIn(email, password, captcha)
        if (response.data.resultCode === ResultCodes.Success) {

            dispatch(authenticationThunkCreator());
        }
        else {
            if (response.data.resultCode === ResultCodes.Captcha) {
                dispatch(getCaptchaThunkCreator())
            }
            if (response.data.messages) {
                setFieldValue("general", response.data.messages.map((item) => item))
            }

        }



    }
}
export const getCaptchaThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const response = await securityauthAPI.getCaptcha();
        const captcha = response.data.url;
        dispatch({
            type: AuthActionTypes.GET_CAPTCHA,
            payload: { captcha }
        })

    }

}


export const logOutThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.logOut();
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch({
                type: AuthActionTypes.SET_USER_DATA,
                payload: {
                    id: null,
                    login: null,
                    email: null,
                    isAuth: false
                }
            })
        }
    }
}


export default authReducer;
