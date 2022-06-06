
// import React from 'react';
// import StoreContext from '../../../redux/StoreContext';
import { connect } from 'react-redux';
import { actionAddPoetry } from '../../../redux/postsReducer';
import Myposts from './MyPosts';



const mapStateToProps = (state) => {
    return {
        posts: state.dialogs.posts,
        newPoetry: state.dialogs.newPoetry,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPoetry: (newMess) => {
            dispatch(actionAddPoetry(newMess))
        },
        
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts);

export default MyPostsContainer;








// const MyPostsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {(store) => {

//                 let state = store.getState();
//                 const addPoetry = () => {

//                     store.dispatch(actionAddPoetry());

//                 }
//                 const readPoetry = (desc) => {


//                     let action = actionReadPoetry(desc);
//                     store.dispatch(action);
//                 }

//                 return <Myposts updateNewPoetry={readPoetry}
//                     addPoetry={addPoetry}
//                     posts={state.dialogs.posts}
//                     newPoetry={state.dialogs.newPoetry}
//                 />
//             }
//             }
//         </StoreContext.Consumer>
//     )
// }



