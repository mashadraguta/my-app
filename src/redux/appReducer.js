import { authenticationThunkCreator } from "./authReducer";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    isInitialized: false,
}


const appReducer = (state = initialState, action) => {

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

export const initializedSuccess = () => ({ type: 'INITIALIZED_SUCCESS' })

//initializedThunk
export const initialized = () => {
    
    return (dispatch) => {
        let promise = dispatch(authenticationThunkCreator());
        promise.then(() => {
            dispatch(initializedSuccess())
        })
    }
}



export default appReducer;
