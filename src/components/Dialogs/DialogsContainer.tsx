import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { actions } from '../../redux/dialogsReducer';
import { WithAuthRedirect } from '../../HOC/WithAuthRedirect'
import { compose } from 'redux';
import { RootStateType } from '../../redux/reduxStore';
import { ComponentType } from 'react';


let mapStateToProps = (state: RootStateType) => {

    return {
        dialogsPage: state.profile.dialogsPage,
        messagesPage: state.profile.messagesPage,
        isAuth: state.auth.isAuth,

    }

}

// let AuthRedirectComponent = WithAuthRedirect(Dialogs);

// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)



const DialogsContainer = compose<ComponentType>(
    connect(mapStateToProps, { ...actions }),
    WithAuthRedirect,
)(Dialogs);

export default DialogsContainer


