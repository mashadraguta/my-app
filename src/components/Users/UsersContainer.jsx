
import { connect } from 'react-redux';
import {
    unfollowThunkCreator, follow,
    followThunkCreator, getUserThunkCreator,
    toggleFollowing, setCurrentPage,
    setTotalCount, setUsers,
    toggleFetching, unfollow
} from '../../redux/usersReducer';
import React, { Component } from 'react';
import Users from './Users';
import Preloader from '../common/Preloader';
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching, getPageSize,
    getTotalCount, getUsers
} from '../../redux/userSelectors';




class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUserThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUserThunkCreator(pageNumber, this.props.pageSize);

    }

    render() {

        return <div>
            <Preloader isFetching={this.props.isFetching} />
            <Users totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onPageChanged={this.onPageChanged}
                followingInProgress={this.props.followingInProgress}
                followThunkCreator={this.props.followThunkCreator}
                unfollowThunkCreator={this.props.unfollowThunkCreator}
            />
        </div>
    }
}


const mapStateToProps = (state) => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }

}



export default connect(mapStateToProps,
    {
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setTotalCount,
        toggleFetching,
        toggleFollowing,
        getUserThunkCreator,
        followThunkCreator,
        unfollowThunkCreator

    })(UsersContainer);


    // const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (usersId) => {
//             dispatch(followAC(usersId));
//         },
//         unfollow: (usersId) => {
//             dispatch(unfollowAC(usersId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage));
//         },
//         setTotalCount: (totalCount) => {
//             dispatch(setCurrentTotalCountAC(totalCount));
//         },
//         toggleFetching: (isFetching) => {
//             dispatch(toggleSetFetchingAC(isFetching));
//         },
//     }

// }



 // this.props.toggleFetching(true);

        // baseAPI.getUsers(this.props.totalUserCount, this.props.pageSize)
        //     .then((data) => {

        //         this.props.toggleFetching(false);
        //         this.props.setUsers(data.items);
        //         this.props.setTotalCount(data.totalCount);
        //     })

         // this.props.setCurrentPage(currentPage);

        // baseAPI.getUsers(currentPage, this.props.pageSize)
        //     .then((data) => {
        //         this.props.toggleFetching(false);
        //         this.props.setUsers(data.items);

        //     })