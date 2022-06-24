import { Dispatch } from "redux";
const { getUsersAPI, profileAPI } = require('../components/api/DAL')



export enum UserActionTypes {
    UNFOLLOW = 'WANT-TO-FOLLOW',
    FOLLOW = 'FOLLOW',
    SET_USERS = 'SET-USERS',
    SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
    SET_TOTAL_COUNT = 'SET-TOTAL-COUNT',
    TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING',
    TOGGLE_IS_FOLLOWING = 'TOGGLE-IS-FOLLOWING',
}


type FollowType = {
    type: UserActionTypes.FOLLOW
    usersId: number
}
type UnfollowType = {
    type: UserActionTypes.UNFOLLOW
    usersId: number
}

type SetUsersType = {
    type: UserActionTypes.SET_USERS
    users: Array<UsersArrayType>
}
type SetPageType = {
    type: UserActionTypes.SET_CURRENT_PAGE
    currentPage: number
}

type SetTotalCountType = {
    type: UserActionTypes.SET_TOTAL_COUNT
    totalItemsCount: number
}
type ToggleFetchingType = {
    type: UserActionTypes.TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFetchingFollowType = {
    type: UserActionTypes.TOGGLE_IS_FOLLOWING
    isFetching: boolean
    usersId: number
}



type PhotosArrayType = {
    small: string
    large: string
}

export type UsersArrayType = {
    name: string | null
    id: number
    photos: PhotosArrayType
    status: string | null
    followed: boolean | null
}


export type ActionUsersType = FollowType | UnfollowType |
    SetUsersType | SetPageType
    | SetTotalCountType | ToggleFetchingType |
    ToggleFetchingFollowType


let initialState = {
    users: [] as Array<UsersArrayType>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    usersId: ''
};


export type InitialStateType = {
    users: Array<UsersArrayType>,
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    usersId: string

};



const usersReducer = (state = initialState, action: ActionUsersType): InitialStateType => {

    switch (action.type) {

        case UserActionTypes.FOLLOW:
            return {
                ...state,
                users: state.users.map((item: any) => {
                    if (item.id === action.usersId) {
                        return { ...item, followed: true }
                    }
                    return item;
                })
            }

        case UserActionTypes.UNFOLLOW:
            return {
                ...state,
                users: state.users.map((item: any) => {
                    if (item.id === action.usersId) {
                        return {
                            ...item,
                            followed: false,
                        }
                    }
                    return item;
                })
            }
        case UserActionTypes.SET_USERS: {
            return { ...state, users: action.users }
        }
        case UserActionTypes.SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case UserActionTypes.SET_TOTAL_COUNT: {
            return { ...state, totalItemsCount: action.totalItemsCount }
        }
        case UserActionTypes.TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case UserActionTypes.TOGGLE_IS_FOLLOWING: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.usersId]
                    : state.followingInProgress.filter(id => id != action.usersId)
            }
        }

        default:
            return state;
    }
}



export const follow = (usersId: number): FollowType => ({ type: UserActionTypes.FOLLOW, usersId });
export const unfollow = (usersId: number): UnfollowType => ({ type: UserActionTypes.UNFOLLOW, usersId });
export const setUsers = (users: Array<UsersArrayType>): SetUsersType => ({ type: UserActionTypes.SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetPageType => ({ type: UserActionTypes.SET_CURRENT_PAGE, currentPage });
export const setTotalCount = (totalItemsCount: number): SetTotalCountType => ({ type: UserActionTypes.SET_TOTAL_COUNT, totalItemsCount });
export const toggleFetching = (isFetching: boolean): ToggleFetchingType => ({ type: UserActionTypes.TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowing = (isFetching: boolean, usersId:number): ToggleFetchingFollowType => ({ type: UserActionTypes.TOGGLE_IS_FOLLOWING, isFetching, usersId });


export const getUserThunkCreator = (page: number, pageSize: number) => {

    return async (dispatch: Dispatch<ActionUsersType>) => {

        dispatch(toggleFetching(true));
        dispatch(setCurrentPage(page));
        let data = await getUsersAPI.getUsers(page, pageSize);
        dispatch(toggleFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));


    }
}
export const unfollowThunkCreator = (usersId: number) => {

    return async (dispatch: Dispatch<ActionUsersType>) => {

        dispatch(toggleFollowing(true, usersId));

        let data = await profileAPI.getUnFollow(usersId);

        if (data.resultCode === 0) {
            dispatch(unfollow(usersId));
        }
        dispatch(toggleFollowing(false, usersId));

    }
}
export const followThunkCreator = (usersId: number) => {

    return async (dispatch: Dispatch<ActionUsersType>) => {

        dispatch(toggleFollowing(true, usersId));

        let data = await profileAPI.getFollow(usersId);

        if (data.resultCode === 0) {
            dispatch(follow(usersId));
        }
        dispatch(toggleFollowing(false, usersId));

    }
}

export default usersReducer;