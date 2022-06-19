//import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import postsReducer from "./postsReducer";
import sideBarReducer from "./sideBarReducer";
import usersReducer from "./usersReducer";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";
//import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        profile: dialogsReducer,
        dialogs: postsReducer,
        sideBar: sideBarReducer,
        users: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer,
    }
})

export default store







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
