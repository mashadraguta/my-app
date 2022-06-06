
import { createSelector } from 'reselect';


const getUsersSelector = (state) => {
    return state.users.users
}

export const getUsers = createSelector(getUsersSelector,
    (users) => { return users.filter(user => user) }
);

export const getPageSize = (state) => {
    return state.users.pageSize
}
export const getTotalCount = (state) => {
    return state.users.totalCount
}
export const getCurrentPage = (state) => {
    return state.users.currentPage
}
export const getIsFetching = (state) => {
    return state.users.isFetching
}
export const getFollowingInProgress = (state) => {
    return state.users.followingInProgress
}


