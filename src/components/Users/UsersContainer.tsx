
import { connect } from 'react-redux';
import {
    unfollowThunkCreator, 
    followThunkCreator,
    getUserThunkCreator
} from '../../redux/usersReducer';
import React, { Component } from 'react';
import Users from './Users';
import Preloader from '../common/Preloader';
import { RootStateType } from '../../redux/reduxStore';
import { compose } from 'redux';
import { UsersType } from '../../types/types';
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


}
type MapDispatchToPropsType = {
    getUserThunkCreator: (currentPage: number, pageNumber: number) => void
    followThunkCreator: (usersId: number) => void
    unfollowThunkCreator: (usersId: number) => void
}

type OwnPropsType = {
    title?: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType






class UsersContainer extends Component<PropsType> {

    componentDidMount() {

        this.props.getUserThunkCreator(this.props.currentPage,
            this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUserThunkCreator(pageNumber, this.props.pageSize);
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

    }

}

//    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootStateType>(mapStateToProps, {
        getUserThunkCreator,
        followThunkCreator,
        unfollowThunkCreator

    }))(UsersContainer);


