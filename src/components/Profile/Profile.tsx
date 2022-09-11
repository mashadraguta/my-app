import React from 'react';
import { ProfileType } from '../../types/types';

import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profileinfo from './ProfileInfo/ProfileInfo';

type MapStateToProps = {
  profile: ProfileType
  userStatus: string | undefined
  isOwner: boolean

}
type MapDispatchToProps = {
  updateStatusThunkCreator: () => void
  savedPhotoThunkCreator: (files: File) => void
}


type PropsType = MapStateToProps & MapDispatchToProps

const Profile: React.FC<PropsType> = (props) => {

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