// import React from 'react';
// import { actionAddPostCreator, actionUpdateNewPostCreator } from '../../redux/dialogsReducer';
// import StoreContext from '../../redux/StoreContext';

import React from 'react';
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


//= connect(mapStateToProps, { addPost, updateOnChange })(AuthRedirectComponent);




// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: () => {
//             dispatch(actionAddPostCreator())
//         },
//         updateOnChange: (text) => {
//             dispatch(actionUpdateNewPostCreator(text))
//         }
//     }
// }
















// const DialogsContainer = () => {

//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState();
//                 const addPost = () => {

//                     store.dispatch(actionAddPostCreator());

//                 }

//                 const updateOnChange = (text) => {

//                     let action = actionUpdateNewPostCreator(text);
//                     store.dispatch(action);

//                 }
//                return <Dialogs updateOnChange={updateOnChange}
//                     addPost={addPost}
//                     dialogsPage={state.profile.dialogsPage}
//                     messagesPage={state.profile.messagesPage}
//                     newTextPost={state.profile.newTextPost}
//                 />
//             }
//             }
//         </StoreContext.Consumer>
//     )

// }

