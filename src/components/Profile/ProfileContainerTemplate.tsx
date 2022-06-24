

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setProfileThunkCreator,
    setStatusThunkCreator,
    updateStatusThunkCreator,
    savedPhotoThunkCreator,
} from '../../redux/postsReducer';
import { compose } from 'redux';
import { RootStateType } from '../../redux/reduxStore';
import Profile from './Profile';

const { WithAuthRedirect, withRouter } = require('../../HOC/WithAuthRedirect');



interface routerT {
    params: ParamsType
}
interface ParamsType {
    userId: string

}



type MapStateToPropsType = {
    router: routerT
    isOwner: boolean
    authorizedUserId: string
    userStatus: string

}
type MapDispatchToPropsType = {
    setProfileThunkCreator: (userId: string) => void
    setStatusThunkCreator: (userId: string) => void
    updateStatusThunkCreator: () => void
    savedPhotoThunkCreator: () => void
}




type PropsType = MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {

        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.setProfileThunkCreator(userId);
        this.props.setStatusThunkCreator(userId);

    }
    componentDidMount() {
        debugger
        this.refreshProfile();

    }
    componentDidUpdate(prevProps: PropsType) {

        if (this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }

    render() {

        return (

            <div>

                <Profile  {...this.props}
                    userStatus={this.props.userStatus}
                    updateStatusThunkCreator={this.props.updateStatusThunkCreator}
                    isOwner={!this.props.router.params.userId}
                    savedPhotoThunkCreator={this.props.savedPhotoThunkCreator}
                />

            </div>
        );
    }
}



let mapStateToProps = (state: RootStateType) => {

    return ({
        profile: state.dialogs.profile,
        userStatus: state.dialogs.userStatus,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    })
};

export default compose<any>(
    connect(
        mapStateToProps,
        {
            setProfileThunkCreator,
            setStatusThunkCreator,
            updateStatusThunkCreator,
            savedPhotoThunkCreator,

        }),
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