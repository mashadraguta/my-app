import { ResultCodes } from './../components/api/DAL';
import { InferActionsTypes, RootStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
import { authAPI } from '../components/api/authAPI';
import { securityauthAPI } from '../components/api/securityAPI';


let initialState = {
    id: 0 as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: false,
    captcha: null as string | null,

}
type AuthInitialState = typeof initialState


export interface TypelogInThunkCreator {
    email: string | null
    password: string | null
    captcha?: string | null
    setFieldValue: (arg: string, arg2: Array<string>) => string
}

// Uncaught Error: The slice reducer for key "auth" returned undefined during initialization. 
// If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. 
// If you don't want to set a value for this reducer, you can use null instead of undefined.


type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsTypes): AuthInitialState => {

    switch (action.type) {

        case "SET_USER_DATA":
        case "GET_CAPTCHA":

            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}


const actions = {
    setAuthUserData: (id: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean) => (
        {
            type: 'SET_USER_DATA',
            payload: { id, email, login, isAuth }
        } as const),
    getCaptchaAC: (captcha: string | null) => (
        {
            type: 'GET_CAPTCHA',
            payload: { captcha },
        } as const)
}

export const authenticationThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const dataMe = await authAPI.getAuthMe();

        if (dataMe.resultCode === ResultCodes.Success) {
            let { id, login, email } = dataMe.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
}


export const logInThunkCreator = (email: string,
    password: string,
    captcha: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void): ThunkType => {
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
        dispatch(actions.getCaptchaAC(captcha))

    }
}

export const logOutThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.logOut();
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;
