// import React from 'react';
// import { actionAddPostCreator, actionUpdateNewPostCreator } from '../../redux/dialogsReducer';
// import StoreContext from '../../redux/StoreContext';


import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { addPostCreator } from '../../redux/dialogsReducer';
import { WithAuthRedirect } from '../../HOC/WithAuthRedirect'
import { compose } from 'redux';


let mapStateToProps = (state) => {

    return {
        dialogsPage: state.profile.dialogsPage,
        messagesPage: state.profile.messagesPage,
        //   newTextPost: state.profile.newTextPost,
        isAuth: state.auth.isAuth,

    }

}
let mapDispatchToProps = (dispatch) => {

    return {
        addPost: (newPostMessage) => {
            dispatch(addPostCreator(newPostMessage));
        }

    }

}


// let AuthRedirectComponent = WithAuthRedirect(Dialogs);

// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)




export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Dialogs);


