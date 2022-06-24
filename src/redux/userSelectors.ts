
import { createSelector } from 'reselect';
import {RootStateType} from './reduxStore';


const getUsersSelector = (state: RootStateType) => {
    return state.users.users
}

export const getUsers = createSelector(getUsersSelector,
    (users) => { return users.filter(user => user) }
);

export const getPageSize = (state: RootStateType) => {
    return state.users.pageSize
}
export const getTotalCount = (state: RootStateType) => {
    return state.users.totalItemsCount
}
export const getCurrentPage = (state: RootStateType) => {
    return state.users.currentPage
}
export const getIsFetching = (state: RootStateType) => {
    return state.users.isFetching
}
export const getFollowingInProgress = (state: RootStateType) => {
    return state.users.followingInProgress
}


