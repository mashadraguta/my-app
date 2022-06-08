import { profileAPI } from "../components/api/DAL";


const ADD_POETRY = 'ADD-POETRY';
const SET_PROFILE_USERS = 'SET-PROFILE-USERS';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';


let initialState = {
    posts: [
        { id: '1', desc: 'Eu nu strivesc corola de minuni a lumii şi nu ucid' },
        { id: '2', desc: 'cu mintea tainele ce-mi ies in cale' },
        { id: '3', desc: 'în flori, în ochi, pe buze ori morminte.' },
        { id: '4', desc: 'Lumina altora sugrumă vraja nepătrunsului ascuns' },
        { id: '5', desc: 'eu cu lumina mea sporesc a lumii taină -' },
        { id: '6', desc: 'şi-ntocmai cum cu razele ei albe luna', author: 'L.Blaga' },

    ],
    profileInfo: [
        { id: 0, text: 'Lapte Condensat' },
        { id: 1, text: 'Actual residence city: Timisoara' },
        { id: 2, text: 'Motto : Citezen of Planet' },
        { id: 3, text: 'Riding. Exploring.Doing' },
        { id: 4, text: 'Happiness is a state of mind' },
    ],
    profile: null,
    userStatus: "",

};

const postsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POETRY: {

            let obj2 = action.newMess;
            return {
                ...state,
                posts: [...state.posts, { id: Math.random(), desc: obj2 }],

            }
        }


        case SET_PROFILE_USERS: {
            return {
                ...state,
                profile: action.profile,

            }

        }
        case SET_STATUS: {
            return {
                ...state,
                userStatus: action.userStatus,

            }

        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(item => item.id != action.id),

            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos },

            }
        }
        default:
            return state;
    }
}


export const actionAddPoetryCreator = (newMess) => ({ type: 'ADD-POETRY', newMess })
export const actionDeletePost = (id) => ({ type: 'DELETE-POST', id })
export const setUsersProfile = (profile) => ({ type: 'SET-PROFILE-USERS', profile })
export const setUsersStatus = (userStatus) => ({ type: 'SET-STATUS', userStatus })
export const savePhotoSuccess = (photos) => ({ type: 'SAVE-PHOTO-SUCCESS', photos })



export const actionAddPoetry = (newMess) => (dispatch) => {
    dispatch({
        type: ADD_POETRY,
        newMess: newMess,
    })
}
export const actionDeletePoetry = (id) => (dispatch) => {
    dispatch({
        type: DELETE_POST,

    })
}

export const setProfileThunkCreator = (userId) => (dispatch) => {
    profileAPI.getUsersProfile(userId).then((response) => {
        dispatch(setUsersProfile(response.data));
    })
}
export const setStatusThunkCreator = (userId) => (dispatch) => {

    profileAPI.getUsersStatus(userId).then((response) => {

        dispatch(setUsersStatus(response.data));
    })
}
export const updateStatusThunkCreator = (userStatus) => (dispatch) => {


    profileAPI.updateUsersStatus(userStatus).then((response) => {
        if (response.data.resultCode === 0) { dispatch(setUsersStatus(userStatus)) }
    })
}


export const savedPhotoThunkCreator = (file) => (dispatch) => {


    profileAPI.savePhoto(file).then((response) => {
        if (response.data.resultCode === 0) { dispatch(savePhotoSuccess(response.data.data.photos)) }
    })
}



export default postsReducer;