import React from 'react';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profileinfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {

  return (

    <div >

      <Profileinfo profile={props.profile}
        userStatus={props.userStatus}
        updateStatusThunkCreator={props.updateStatusThunkCreator}
        isOwner={props.isOwner}
        savedPhotoThunkCreator={props.savedPhotoThunkCreator} />
      <MyPostsContainer />

    </div>
  )
}

export default Profile;