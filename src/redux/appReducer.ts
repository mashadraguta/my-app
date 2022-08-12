import { RootStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { authenticationThunkCreator } from "./authReducer";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type InitialStateType = {
    isInitialized: boolean,
}


let initialState: InitialStateType = {
    isInitialized: false,
}

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

type ThunkType = ThunkAction<void, RootStateType, unknown, InitializedSuccessType>

const appReducer = (state = initialState, action: InitializedSuccessType): InitialStateType => {

    switch (action.type) {

        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                isInitialized: true,

            }
        }
        default:
            return state;
    }
}




export const initializedSuccess = (): InitializedSuccessType => ({ type: 'INITIALIZED_SUCCESS' })

//initializedThunk
export const initialized = (): ThunkType => {

    return (dispatch) => {
       
        let promise = dispatch(authenticationThunkCreator());
        promise.then(() => {
            dispatch(initializedSuccess())
        })
    }
}



export default appReducer;



