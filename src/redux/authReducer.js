import { toggleFetching } from "./usersReducer";
import { authAPI } from "../components/api/DAL";
import { Navigate } from "react-router-dom";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    id: 0,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,

}


const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA: {
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


export const authenticationThunkCreator = (email, password) => {
    return async (dispatch) => {
        const response = await authAPI.getAuthMe();
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }

    }

}

export const logInThunkCreator = (email, password, setFieldValue) => {
    return async (dispatch) => {
        const response = await authAPI.logIn(email, password)
        if (response.data.resultCode === 0) {
            dispatch(authenticationThunkCreator());
        }
        else {

            setFieldValue("general", response.data.messages.join(" "))
        }


    }
}
// export const logOutThunkCreator = () => {
//     return (dispatch) => {
//         authAPI.logOut().then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(setAuthUserData(null, null));
//             }
//         })
//     }
// }

export const logOutThunkCreator = () => {
    return async (dispatch) => {
        const response =await authAPI.logOut();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null));
       }
    }
}


export default authReducer;
