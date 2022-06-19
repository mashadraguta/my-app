import { Dispatch } from "redux";
import { authenticationThunkCreator } from "./authReducer";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    isInitialized: boolean,
}


let initialState: InitialStateType = {
    isInitialized: false,
}


const appReducer = (state = initialState, action: initializedSuccessType): InitialStateType => {

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


export type initializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessType => ({ type: 'INITIALIZED_SUCCESS' })

//initializedThunk
export const initialized = () => {

    return (dispatch: any) => {
        let promise = dispatch(authenticationThunkCreator());
        promise.then(() => {
            dispatch(initializedSuccess())
        })
    }
}



export default appReducer;
