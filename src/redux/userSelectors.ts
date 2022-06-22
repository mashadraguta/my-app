
import { createSelector } from 'reselect';
import { RootState } from './reduxStore';


const getUsersSelector = (state: RootState) => {
    return state.users.users
}

export const getUsers = createSelector(getUsersSelector,
    (users) => { return users.filter(user => user) }
);

export const getPageSize = (state: RootState) => {
    return state.users.pageSize
}
export const getTotalCount = (state: RootState) => {
    return state.users.totalItemsCount
}
export const getCurrentPage = (state: RootState) => {
    return state.users.currentPage
}
export const getIsFetching = (state: RootState) => {
    return state.users.isFetching
}
export const getFollowingInProgress = (state: RootState) => {
    return state.users.followingInProgress
}


