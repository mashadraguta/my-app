

import React, { Component } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setProfileThunkCreator, setStatusThunkCreator, updateStatusThunkCreator } from '../../redux/postsReducer';
import { WithAuthRedirect, withRouter } from '../../HOC/WithAuthRedirect';
import { compose } from 'redux';




class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {

            userId = 23933;
        }
        this.props.setProfileThunkCreator(userId);
        this.props.setStatusThunkCreator(userId);

    }
    render() {
     
        return (
            <Profile {...this.props} userStatus={this.props.userStatus} updateStatusThunkCreator={this.props.updateStatusThunkCreator} />
        );
    }
}



let mapStateToProps = (state) => {

    return ({
        profile: state.dialogs.profile,
        userStatus: state.dialogs.userStatus,
        isAuth: state.auth.isAuth,
    })
};

export default compose(
    connect(mapStateToProps, { setProfileThunkCreator, setStatusThunkCreator, updateStatusThunkCreator }),
    withRouter,
    WithAuthRedirect,
)(ProfileContainer);









  // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        //     .then(response => {
        //         this.props.setUsersProfile(response.data);
        //     })





// function withRouter(ProfileContainer) {
//     function AuthRedirectComponent(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         if (!props.isAuth) {
//             return <Navigate to="/login" />
//         }
//         return (

//             <ProfileContainer
//                 {...props}
//                 router={{ location, navigate, params }}

//             />
//         );
//     }

//     return AuthRedirectComponent;
// }







//connect(mapStateToProps, { setProfileThunkCreator })(withRouter(ProfileContainer));





   // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        //     .then((response) => {

        //         this.props.setUsersProfile(response.data);

        //     })