
import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/postsReducer';
import { RootStateType } from '../../../redux/reduxStore';
import Myposts from './MyPosts';



const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.dialogs.posts,
        newMess: state.dialogs.newMess,
    }
}


type ActionPoetryType = {
    actionAddPoetry: (newMess: string) => void
}

const MyPostsContainer = connect(mapStateToProps, { ...actions })(Myposts);

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



