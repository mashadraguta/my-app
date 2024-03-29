

import { RootStateType } from './reduxStore';



export const getUsers = (state: RootStateType) => {
    return state.users.users
}
export const getPageSize = (state: RootStateType) => {
    return state.users.pageSize
}
export const getTotalCount = (state: RootStateType) => {
    return state.users.totalItemsCount
}
export const getFilter = (state: RootStateType) => {
    return state.users.filter
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


