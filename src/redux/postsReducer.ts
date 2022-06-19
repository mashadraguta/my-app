//import { profileAPI } from "../components/api/DAL";

const { profileAPI } = require("../components/api/DAL")


const ADD_POETRY = 'ADD-POETRY';
const SET_PROFILE_USERS = 'SET-PROFILE-USERS';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';
const UPDATE_PROFILE_INFO = 'UPDATE-PROFILE-INFO';


type PostType = {
    id: number
    desc: string
}

type PhotosType = {
    small: string | null
    large: string | null
}


type ProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: ProfileContactsType | null
    photos: PhotosType | null
}

type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

let initialState = {
    posts: [
        { id: 1, desc: 'Eu nu strivesc corola de minuni a lumii şi nu ucid' },
        { id: 2, desc: 'cu mintea tainele ce-mi ies in cale' },
        { id: 3, desc: 'în flori, în ochi, pe buze ori morminte.' },
        { id: 4, desc: 'Lumina altora sugrumă vraja nepătrunsului ascuns' },
        { id: 5, desc: 'eu cu lumina mea sporesc a lumii taină -' },
        { id: 6, desc: 'şi-ntocmai cum cu razele ei albe luna' },

    ] as Array<PostType>,

    profile: null as ProfileType | null,
    userStatus: "",
};

export type InitialStateType = typeof initialState;

const postsReducer = (state = initialState, action: any): InitialStateType => {

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
                profile: { ...state.profile, photos: action.photos } as ProfileType,

            }
        }

        default:
            return state;
    }
}


type ActionAddPoetryCreator = {
    type: typeof ADD_POETRY
    newMess: string
}

type SetUsersProfile = {
    type: typeof SET_PROFILE_USERS
    profile: ProfileType
}
type SetUsersStatus = {
    type: typeof SET_STATUS
    userStatus: string
}
type SavePhotoSuccess = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}


export const actionAddPoetryCreator = (newMess: string): ActionAddPoetryCreator => ({ type: 'ADD-POETRY', newMess })
export const setUsersProfile = (profile: ProfileType): SetUsersProfile => ({ type: 'SET-PROFILE-USERS', profile })
export const setUsersStatus = (userStatus: string): SetUsersStatus => ({ type: 'SET-STATUS', userStatus })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccess => ({ type: 'SAVE-PHOTO-SUCCESS', photos })



export const actionAddPoetry = (newMess: string) => (dispatch: any) => {
    dispatch({
        type: ADD_POETRY,
        newMess: newMess,
    })
}
export const actionDeletePoetry = (id: number) => (dispatch: any) => {
    dispatch({
        type: DELETE_POST,

    })
}

export const setProfileThunkCreator = (userId: number) => (dispatch: any) => {

    profileAPI.getUsersProfile(userId).then((response: any) => {

        dispatch(setUsersProfile(response.data));
    })

}


export const updateProfileThunkCreator = (profile: ProfileType, setFieldValue: any) => {

    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.id;
        const response = await profileAPI.updateUserProfile(profile)

        if (response.data.resultCode === 0) {
            dispatch(setProfileThunkCreator(userId))

        }
        else {
            setFieldValue("aboutMe", response.data.messages.find((item: any) => item.includes('AboutMe')));
                setFieldValue("fullName", response.data.messages.find((item: any) => item.includes('FullName')));
                setFieldValue("lookingForAJobDescription", response.data.messages.find((item: any) => item.includes('LookingForAJobDescription')));
                setFieldValue("contacts.facebook", response.data.messages.find((item: any) => item.includes('Facebook')));
                setFieldValue("contacts.website", response.data.messages.find((item: any) => item.includes('Website')));
                setFieldValue("contacts.vk", response.data.messages.find((item: any) => item.includes('Vk')));
                setFieldValue("contacts.twitter", response.data.messages.find((item: any) => item.includes('Twitter')));
                setFieldValue("contacts.instagram", response.data.messages.find((item: any) => item.includes('Instagram')));
                setFieldValue("contacts.youtube", response.data.messages.find((item: any) => item.includes('Youtube')));
                setFieldValue("contacts.github", response.data.messages.find((item: any) => item.includes('Github')));
                setFieldValue("contacts.mainLink", response.data.messages.find((item: any) => item.includes('MainLink')));

                return Promise.reject();

        }
      
    }
      
}



export const setStatusThunkCreator = (userId: number) => (dispatch: any) => {

    profileAPI.getUsersStatus(userId).then((response: any) => {

        dispatch(setUsersStatus(response.data));
    })
}
export const updateStatusThunkCreator = (userStatus: string) => (dispatch: any) => {

    profileAPI.updateUsersStatus(userStatus).then((response: any) => {
        if (response.data.resultCode === 0) { dispatch(setUsersStatus(userStatus)) }
    })
}


export const savedPhotoThunkCreator = (file: any) => (dispatch: any) => {


    profileAPI.savePhoto(file).then((response: any) => {
        if (response.data.resultCode === 0) { dispatch(savePhotoSuccess(response.data.data.photos)) }
    })
}



export default postsReducer;