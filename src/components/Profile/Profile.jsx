import React from 'react';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profileinfo from './ProfileInfo/ProfileInfo';



const Profile = (props) => {

  return (

    <div >

      <Profileinfo profile={props.profile} userStatus={props.userStatus} updateStatusThunkCreator={props.updateStatusThunkCreator} />
      <MyPostsContainer />

    </div>
  )
}

export default Profile;