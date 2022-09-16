import { RootStateType, InferActionsTypes } from './reduxStore';
import { ThunkAction } from "redux-thunk";
import { getUsersAPI, profileAPI } from '../components/api/usersAPI';
import { UsersType } from '../types/types';


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    usersId: '',
    filter: {
        term: '',
        friend: null as null | boolean
    }
};


export type FilterType = typeof initialState.filter


export type InitialStateType = {
    users: Array<UsersType>,
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    usersId: string
    filter: FilterType

};

type ThunkType = ThunkAction<Promise<any>, RootStateType, unknown, ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map((item: any) => {
                    if (item.id === action.usersId) {
                        return { ...item, followed: true }
                    }
                    return item;
                })
            }

        case "UNFOLLOW":
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
        case "SET_USERS": {
            return { ...state, users: action.users }
        }
        case "SET_CURRENT_PAGE": {
            return { ...state, currentPage: action.currentPage }
        }
        case "SET_FILTER": {
            return { ...state, filter: action.payload }
        }
        case "SET_TOTAL_COUNT": {
            return { ...state, totalItemsCount: action.totalItemsCount }
        }
        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }
        case 'TOGGLE_IS_FOLLOWING': {
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


export const actions = {
    follow: (usersId: number) => ({ type: "FOLLOW", usersId } as const),
    unfollow: (usersId: number) => ({ type: "UNFOLLOW", usersId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: "SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: "SET_FILTER", payload: filter } as const),
    setTotalCount: (totalItemsCount: number) => ({ type: "SET_TOTAL_COUNT", totalItemsCount } as const),
    toggleFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowing: (isFetching: boolean, usersId: number) => ({ type: 'TOGGLE_IS_FOLLOWING', isFetching, usersId } as const),
}





export const getUserThunkCreator = (page: number,
    pageSize: number, filter: FilterType): ThunkType => {

    return async (dispatch) => {

        dispatch(actions.toggleFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));
        let data = await getUsersAPI.getUsers(page, pageSize, filter.term);
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalCount(data.totalCount));


    }
}
export const unfollowThunkCreator = (usersId: number): ThunkType => {

    return async (dispatch) => {

        dispatch(actions.toggleFollowing(true, usersId));

        let data = await profileAPI.getUnFollow(usersId);

        if (data.resultCode === 0) {
            dispatch(actions.unfollow(usersId));
        }
        dispatch(actions.toggleFollowing(false, usersId));

    }
}
export const followThunkCreator = (usersId: number): ThunkType => {

    return async (dispatch) => {

        dispatch(actions.toggleFollowing(true, usersId));

        let data = await profileAPI.getFollow(usersId);

        if (data.resultCode === 0) {
            dispatch(actions.follow(usersId));
        }
        dispatch(actions.toggleFollowing(false, usersId));

    }
}

export default usersReducer;