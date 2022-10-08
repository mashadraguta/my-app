import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore as createStore
} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import postsReducer from "./postsReducer";
import sideBarReducer from "./sideBarReducer";
import usersReducer from "./usersReducer";
import  chatReducer  from "./chatReducer";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";



let rootReducer = combineReducers({
    profile: dialogsReducer,
    dialogs: postsReducer,
    sideBar: sideBarReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat:chatReducer,
})

//type RootState = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type RootStateType = ReturnType<typeof rootReducer>

export type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.__store__ = store

export default store







// const store = configureStore({
//     reducer: {
//         profile: dialogsReducer,
//         dialogs: postsReducer,
//         sideBar: sideBarReducer,
//         users: usersReducer,
//         auth: authReducer,
//         form: formReducer,
//         app: appReducer,
//     }
// })
// export type RootState = ReturnType<typeof store.getState>
// export default store







// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


// let reducers = combineReducers({
//     profile: dialogsReducer,
//     dialogs: postsReducer,
//     sideBar: sideBarReducer,
//     users: usersReducer,
//     auth: authReducer,
//     form: formReducer,
//     app: appReducer,
// });


// const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);


// window.store = store;
// export default store;
