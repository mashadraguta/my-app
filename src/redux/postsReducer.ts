import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, RootStateType } from './reduxStore';
import { Dispatch } from 'redux';
import { profileAPI } from '../components/api/usersAPI';
import { PhotosType, ProfileType } from '../types/types';



export type PostType = {
    id: string
    desc: string
}

let initialState = {
    posts: [
        { id: '1', desc: 'Eu nu strivesc corola de minuni a lumii şi nu ucid' },
        { id: '2', desc: 'cu mintea tainele ce-mi ies in cale' },
        { id: '3', desc: 'în flori, în ochi, pe buze ori morminte.' },
        { id: '4', desc: 'Lumina altora sugrumă vraja nepătrunsului ascuns' },
        { id: ' 5', desc: 'eu cu lumina mea sporesc a lumii taină -' },
        { id: ' 6', desc: 'şi-ntocmai cum cu razele ei albe luna' },

    ] as Array<PostType>,

    profile: null as ProfileType | null,
    userStatus: "",
    newMess: "",
};

export type InitialStateType = typeof initialState;

const postsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case 'ADD_POETRY': {

            let obj2 = action.newMess;
            return {
                ...state,
                posts: [...state.posts, { id: '9', desc: obj2 }],
            }
        }
        case 'SET_PROFILE_USERS': {
            return {
                ...state,
                profile: action.profile,

            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                userStatus: action.userStatus,

            }

        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(item => item.id != action.id),

            }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType,

            }
        }

        default:
            return state;
    }
}

type GetStateType = () => RootStateType
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionUsersType>
export type ActionUsersType = InferActionsTypes<typeof actions>

export const actions = {
    actionAddPoetryCreator: (newMess: string) => ({ type: "ADD_POETRY", newMess } as const),
    setUsersProfile: (profile: ProfileType) => ({ type: "SET_PROFILE_USERS", profile } as const),
    setUsersStatus: (userStatus: string) => ({ type: "SET_STATUS", userStatus } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: "SAVE_PHOTO_SUCCESS", photos } as const),
    setProfileThunk: (userId: number) => ({ type: "SET_PROFILE_USERS", userId } as const),
    actionDeletePost: (postId: number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
}

export const actionAddPoetry = (newMess: string): ThunkType => (dispatch) => {
    dispatch(actions.actionAddPoetryCreator(newMess))
}

export const setProfileThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUsersProfile(userId)
    dispatch(actions.setUsersProfile(data))
}


export const updateProfileThunkCreator = (profile: ProfileType,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void): ThunkType => {
    return async (dispatch, getState) => {
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

export const setStatusThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUsersStatus(userId)
    dispatch(actions.setUsersStatus(data));

}
export const updateStatusThunkCreator = (userStatus: string): ThunkType => (dispatch) => {

    profileAPI.updateUsersStatus(userStatus).then((response) => {
        if (response.data.resultCode === 0) {
            dispatch(actions.setUsersStatus(userStatus))
        }
    })
}


export const savedPhotoThunkCreator = (file: any): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}




export default postsReducer;