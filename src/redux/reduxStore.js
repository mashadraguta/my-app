import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import postsReducer from "./postsReducer";
import sideBarReducer from "./sideBarReducer";
import usersReducer from "./usersReducer.js";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";



let reducers = combineReducers({
    profile: dialogsReducer,
    dialogs: postsReducer,
    sideBar: sideBarReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});


const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

window.store = store;
export default store;
