
import { connect } from 'react-redux';
import {
    unfollowThunkCreator, followThunkCreator,
    getUserThunkCreator, UsersArrayType
} from '../../redux/usersReducer';
import React, { Component } from 'react';
import Users from './Users';
import { RootState } from '../../redux/reduxStore';

import Preloader from '../common/Preloader';
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
    users: Array<UsersArrayType>
    followingInProgress: Array<number>


}
type MapDispatchToPropsType = {
    getUserThunkCreator: (currentPage: number, pageNumber: number) => void
    followThunkCreator: (usersId: number) => void
    unfollowThunkCreator: (usersId: number) => void
}

type OwnPropsType = {

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType


class UsersContainer extends Component<PropsType> {

    componentDidMount() {
        this.props.getUserThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUserThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {

        return <div>

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


const mapStateToProps = (state: any) => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }

}

// <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
//(mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>, 
//mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>):
// InferableComponentEnhancerWithProps<TStateProps & ResolveThunks<TDispatchProps>, TOwnProps>;


export default connect<MapStateToPropsType, MapDispatchToPropsType, any>(mapStateToProps,
    {
        getUserThunkCreator,
        followThunkCreator,
        unfollowThunkCreator

    })(UsersContainer);


