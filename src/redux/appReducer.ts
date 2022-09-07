import { InferActionsTypes, RootStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
import { authenticationThunkCreator } from "./authReducer";


type InitialStateType = typeof initialState
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>

const initialState = {
    isInitialized: false,
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS": {
            return {
                ...state,
                isInitialized: true,

            }
        }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}

export const initialized = (): ThunkType => {

    return (dispatch) => {

        let promise = dispatch(authenticationThunkCreator());
        promise.then(() => {
            dispatch(actions.initializedSuccess())
        })
    }
}

export default appReducer;



