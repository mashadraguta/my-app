

import React, {  ComponentType } from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
    setProfileThunkCreator,
    setStatusThunkCreator,
    updateStatusThunkCreator,
    savedPhotoThunkCreator,

} from '../../redux/postsReducer';
import { WithAuthRedirect, withRouter } from '../../HOC/WithAuthRedirect';
import { compose } from 'redux';
import { RootStateType } from '../../redux/reduxStore';
import { ProfileType } from '../../types/types';


interface ParamsType {
    userId: number
}

interface routerT {
    params: ParamsType
}

type MapStateToPropsType = {
    router: routerT
    isOwner: boolean
    authorizedUserId: number
    userStatus: string
    profile: ProfileType

}
type MapDispatchToProps = {
    setProfileThunkCreator: (userId: number) => void
    setStatusThunkCreator: (userId: number) => void
    savedPhotoThunkCreator: () => void
    updateStatusThunkCreator: () => void
}

class ProfileContainer extends React.Component<MapStateToPropsType & MapDispatchToProps> {

    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }

        this.props.setProfileThunkCreator(userId);
        this.props.setStatusThunkCreator(userId);

    }
    componentDidMount() {

        this.refreshProfile();

    }
    componentDidUpdate(prevProps: MapStateToPropsType, prevState: RootStateType) {

        if (this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile();
        }

    }

    render() {

        return (

            <div>

                <Profile {...this.props}
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


const ProfileContainerMain = compose<ComponentType>(
    connect(mapStateToProps,
        {
            setProfileThunkCreator,
            setStatusThunkCreator,
            updateStatusThunkCreator,
            savedPhotoThunkCreator,

        }),
    withRouter,
    WithAuthRedirect,
)(ProfileContainer)


export default ProfileContainerMain


// export default compose(
//     connect(mapStateToProps,
//         {
//             setProfileThunkCreator,
//             setStatusThunkCreator,
//             updateStatusThunkCreator,
//             savedPhotoThunkCreator,

//         }),
//     withRouter,
//     WithAuthRedirect,
// )(ProfileContainer);

