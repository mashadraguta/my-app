
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


interface FollowType {
    type: UserActionTypes.FOLLOW
    usersId: number
}
interface UnfollowType {
    type: UserActionTypes.UNFOLLOW
    usersId: number
}

interface SetUsersType {
    type: UserActionTypes.SET_USERS
    users: UsersArrayType | null
}
interface SetPageType {
    type: UserActionTypes.SET_CURRENT_PAGE
    currentPage: number
}

interface SetTotalCountType {
    type: UserActionTypes.SET_TOTAL_COUNT
    totalCount: number
}
interface ToggleFetchingType {
    type: UserActionTypes.TOGGLE_IS_FETCHING
    isFetching: boolean
}
interface ToggleFetchingFollowType {
    type: UserActionTypes.TOGGLE_IS_FOLLOWING
    isFetching: boolean
    usersId: number
}



interface PhotosArrayType {
    small: string
    large: string
}

interface UsersArrayType {
    name: string
    id: number
    photos: PhotosArrayType | null
    status: string | null
    followed: boolean
}


export type ActionUsersType = FollowType | UnfollowType | SetUsersType | SetPageType | SetTotalCountType | ToggleFetchingType | ToggleFetchingFollowType


let initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};



const usersReducer = (state = initialState, action: ActionUsersType) => {

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
            return { ...state, totalCount: action.totalCount }
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
export const setUsers = (users: UsersArrayType): SetUsersType => ({ type: UserActionTypes.SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetPageType => ({ type: UserActionTypes.SET_CURRENT_PAGE, currentPage });
export const setTotalCount = (totalCount: number): SetTotalCountType => ({ type: UserActionTypes.SET_TOTAL_COUNT, totalCount });
export const toggleFetching = (isFetching: boolean): ToggleFetchingType => ({ type: UserActionTypes.TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowing = (isFetching: boolean, usersId: number): ToggleFetchingFollowType => ({ type: UserActionTypes.TOGGLE_IS_FOLLOWING, isFetching, usersId });


export const getUserThunkCreator = (page: number, pageSize: number) => {

    return async (dispatch: any) => {

        dispatch(toggleFetching(true));
        dispatch(setCurrentPage(page));

        let data = await getUsersAPI.getUsers(page, pageSize);

        dispatch(toggleFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));


    }
}
export const unfollowThunkCreator = (usersId: number) => {

    return async (dispatch: any) => {

        dispatch(toggleFollowing(true, usersId));

        let data = await profileAPI.getUnFollow(usersId);

        if (data.resultCode === 0) {
            dispatch(unfollow(usersId));
        }
        dispatch(toggleFollowing(false, usersId));

    }
}
export const followThunkCreator = (usersId: number) => {

    return async (dispatch: any) => {

        dispatch(toggleFollowing(true, usersId));

        let data = await profileAPI.getFollow(usersId);

        if (data.resultCode === 0) {
            dispatch(follow(usersId));
        }
        dispatch(toggleFollowing(false, usersId));

    }
}

export default usersReducer;