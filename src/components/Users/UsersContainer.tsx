
import { connect } from 'react-redux';
import {
    unfollowThunkCreator,
    followThunkCreator,
    getUserThunkCreator,
    FilterType
} from '../../redux/usersReducer';
import React, { Component } from 'react';
import Users from './Users';
import Preloader from '../common/Preloader';
import { RootStateType } from '../../redux/reduxStore';
import { compose } from 'redux';
import { UsersType } from '../../types/types';
import { getFilter } from '../../redux/userSelectors';
const {
    getCurrentPage, getFollowingInProgress,
    getIsFetching, getPageSize,
    getTotalCount, getUsers
} = require('../../redux/userSelectors');


type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalItemsCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    filter: FilterType

}
type MapDispatchToPropsType = {
    getUserThunkCreator: (currentPage: number, pageNumber: number, filter: FilterType) => void
    followThunkCreator: (usersId: number) => void
    unfollowThunkCreator: (usersId: number) => void
}

type OwnPropsType = {
    title?: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends Component<PropsType> {

    componentDidMount() {

        const { currentPage, pageSize, filter } = this.props
        this.props.getUserThunkCreator(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize, filter } = this.props
        this.props.getUserThunkCreator(pageNumber, pageSize, filter)
    }
    onFilterChanged = (filter: FilterType) => {

        const {  pageSize } = this.props
        this.props.getUserThunkCreator(1, pageSize, filter)
    }

    render() {

        return <div>
            <h1>{this.props.title}</h1>
            <Preloader isFetching={this.props.isFetching} />
            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                followingInProgress={this.props.followingInProgress}
                followThunkCreator={this.props.followThunkCreator}
                unfollowThunkCreator={this.props.unfollowThunkCreator}

            />
        </div>
    }
}


const mapStateToProps = (state: RootStateType): MapStateToPropsType => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getFilter(state),

    }

}

//    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootStateType>(mapStateToProps, {
        getUserThunkCreator,
        followThunkCreator,
        unfollowThunkCreator

    }))(UsersContainer);


