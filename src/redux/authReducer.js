
import { authAPI, securityauthAPI } from "../components/api/DAL";


const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA = 'GET_CAPTCHA';

let initialState = {
    id: 0,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
    captcha: null,

}


const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA:
            {
                return {
                    ...state,
                    ...action.payload,
                }
            }

        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => (
    {
        type: 'SET_USER_DATA',
        payload: { id, email, login, isAuth }
    })


export const getCaptchaAC = (captcha) => (
    {
        type: 'GET_CAPTCHA',
        payload: { captcha },
    })


export const authenticationThunkCreator = () => {
    return async (dispatch) => {
        const response = await authAPI.getAuthMe();
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }


    }

}


export const logInThunkCreator = (email, password, captcha, setFieldValue) => {
    return async (dispatch) => {
        const response = await authAPI.logIn(email, password, captcha)
        if (response.data.resultCode === 0) {
            dispatch(authenticationThunkCreator());
        }
        else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaThunkCreator())

            }
            setFieldValue("general", response.data.messages.map(item => item))
        }



    }
}
export const getCaptchaThunkCreator = () => {
    return async (dispatch) => {
        const response = await securityauthAPI.getCaptcha();
        const captcha = response.data.url;
        dispatch(getCaptchaAC(captcha))

    }

}


export const logOutThunkCreator = () => {
    return async (dispatch) => {
        const response = await authAPI.logOut();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null));
        }
    }
}


export default authReducer;
