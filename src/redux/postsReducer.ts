import { ThunkAction } from 'redux-thunk';
import { RootStateType } from './reduxStore';
import { Dispatch } from 'redux';
//import { profileAPI } from "../components/api/DAL";

import { profileAPI } from "../components/api/DAL"


export enum UserActionTypes {
    ADD_POETRY = 'ADD-POETRY',
    SET_PROFILE_USERS = 'SET-PROFILE-USERS',
    SET_STATUS = 'SET-STATUS',
    DELETE_POST = 'DELETE-POST',
    SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS',
    UPDATE_PROFILE_INFO = 'UPDATE-PROFILE-INFO',
}


type PostType = {
    id: number
    desc: string
}

type PhotosType = {
    small: string | null
    large: string | null
}


export type ProfileType = {
    userId?: number
    lookingForAJob?: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos?: PhotosType
}

export type ProfileContactsType = {
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
        case UserActionTypes.ADD_POETRY: {

            let obj2 = action.newMess;
            return {
                ...state,
                posts: [...state.posts, { id: Math.random(), desc: obj2 }],
            }
        }
        case UserActionTypes.SET_PROFILE_USERS: {
            return {
                ...state,
                profile: action.profile,

            }
        }
        case UserActionTypes.SET_STATUS: {
            return {
                ...state,
                userStatus: action.userStatus,

            }

        }
        case UserActionTypes.DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(item => item.id != action.id),

            }
        }
        case UserActionTypes.SAVE_PHOTO_SUCCESS: {
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
    type: UserActionTypes.ADD_POETRY
    newMess: string
}

type SetUsersProfile = {
    type: UserActionTypes.SET_PROFILE_USERS
    profile: ProfileType
}
type SetUsersStatus = {
    type: UserActionTypes.SET_STATUS
    userStatus: string
}
type SavePhotoSuccess = {
    type: UserActionTypes.SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
type SetProfileUsers = {
    type: UserActionTypes.SET_PROFILE_USERS
    userId: number
}
type DeletePost = {
    type: UserActionTypes.DELETE_POST
    id?: number
}

type GetStateType = () => RootStateType


export type ActionUsersType = SavePhotoSuccess | SetUsersStatus |
    SetUsersProfile | ActionAddPoetryCreator | SetProfileUsers | DeletePost

type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionUsersType>

export const actionAddPoetryCreator = (newMess: string): ActionAddPoetryCreator => ({ type: UserActionTypes.ADD_POETRY, newMess })
export const setUsersProfile = (profile: ProfileType): SetUsersProfile => ({ type: UserActionTypes.SET_PROFILE_USERS, profile })
export const setUsersStatus = (userStatus: string): SetUsersStatus => ({ type: UserActionTypes.SET_STATUS, userStatus })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccess => ({ type: UserActionTypes.SAVE_PHOTO_SUCCESS, photos })
export const setProfileThunk = (userId: number): SetProfileUsers => ({ type: UserActionTypes.SET_PROFILE_USERS, userId })



export const actionAddPoetry = (newMess: string) => (dispatch: Dispatch<ActionUsersType>) => {
    dispatch({
        type: UserActionTypes.ADD_POETRY,
        newMess: newMess,
    })
}
export const actionDeletePoetry = (id: number) => (dispatch: Dispatch<ActionUsersType>) => {
    dispatch({
        type: UserActionTypes.DELETE_POST,
    })
}

export const setProfileThunkCreator = (userId: number) => {
    return async (dispatch: Dispatch<ActionUsersType>) => {

        profileAPI.getUsersProfile(userId).then((response) => {

            dispatch(setUsersProfile(response.data));

        })

    }
}


export const updateProfileThunkCreator = (profile: ProfileType, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    return async (dispatch: Dispatch<ActionUsersType>, getState: GetStateType) => {
        const userId = getState().auth.id
        const response = await profileAPI.updateUserProfile(profile)
        if (response.data.resultCode === 0) {
            if (userId !== null) {
                //@ts-ignore
                dispatch(setProfileThunkCreator(userId))
            }
            else {
                throw new Error("userId can't be null")
            }
        } else {
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



export const setStatusThunkCreator = (userId: number) => (dispatch: Dispatch<ActionUsersType>) => {

    profileAPI.getUsersStatus(userId).then((response: any) => {

        dispatch(setUsersStatus(response.data));
    })
}
export const updateStatusThunkCreator = (userStatus: string) => (dispatch: Dispatch<ActionUsersType>) => {

    profileAPI.updateUsersStatus(userStatus).then((response: any) => {
        if (response.data.resultCode === 0) { dispatch(setUsersStatus(userStatus)) }
    })
}


export const savedPhotoThunkCreator = (file: any) => (dispatch: Dispatch<ActionUsersType>) => {


    profileAPI.savePhoto(file).then((response: any) => {
        if (response.data.resultCode === 0) { dispatch(savePhotoSuccess(response.data.data.photos)) }
    })
}



export default postsReducer;