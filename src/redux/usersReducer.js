import { getUsersAPI, profileAPI } from "../components/api/DAL";



const UNFOLLOW = 'WANT-TO-FOLLOW';
const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE-IS-FOLLOWING';


let initialState = {
    users: [],
    pageSize: 6,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [], //this array will carry the picked-up id by pushing the bottom
    fake: 10,

};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.usersId) {
                        return {
                            ...item,
                            followed: true,
                        }
                    }
                    return item;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.usersId) {
                        return {
                            ...item,
                            followed: false,
                        }
                    }
                    return item;
                })
            }
        case SET_USERS: {
            return {
                ...state,
                users: action.users,
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage,
            }
        }
        case SET_TOTAL_COUNT: {
            return {
                ...state,
                totalCount: action.totalCount,
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case TOGGLE_IS_FOLLOWING: {
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



export const follow = (usersId) => ({ type: FOLLOW, usersId });
export const unfollow = (usersId) => ({ type: UNFOLLOW, usersId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount });
export const toggleFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowing = (isFetching, usersId) => ({ type: TOGGLE_IS_FOLLOWING, isFetching, usersId });


export const getUserThunkCreator = (page, pageSize) => {

    return async (dispatch) => {

        dispatch(toggleFetching(true));
        dispatch(setCurrentPage(page));

        let data = await getUsersAPI.getUsers(page, pageSize);

        dispatch(toggleFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));


    }
}
export const unfollowThunkCreator = (usersId) => {

    return async (dispatch) => {

        dispatch(toggleFollowing(true, usersId));

        let data = await profileAPI.getUnFollow(usersId);

        if (data.resultCode === 0) {
            dispatch(unfollow(usersId));
        }
        dispatch(toggleFollowing(false, usersId));

    }
}
export const followThunkCreator = (usersId) => {

    return async (dispatch) => {
        
        dispatch(toggleFollowing(true, usersId));

        let data = await profileAPI.getFollow(usersId);

        if (data.resultCode === 0) {
            dispatch(follow(usersId));
        }
        dispatch(toggleFollowing(false, usersId));

    }
}

export default usersReducer;