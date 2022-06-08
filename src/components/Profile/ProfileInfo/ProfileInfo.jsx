import React from 'react';
import Preloader from '../../common/Preloader';
import s from '../Profile.module.css';
import image from '../../images/image2.png';
import ProfileStatusWithHooks from '../ProfileStatus/ProfileStatusWithHooks';
import UploadImage from '../../common/UploadImage/UploadImage.jsx';




const Profileinfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savedPhotoThunkCreator(e.target.files[0])
        }
    }

    return (

        <div>

            <div className={s.maincontent__image}>
                <img src="https://64.media.tumblr.com/fa25cb008890f21c7d65018bd300a14c/753bf278597a4ffd-ee/s500x750/b63c8465f21ef5c71fff7ac1b979dd32acac7860.jpg" alt=""></img>
            </div>

            <div className={s.maincontent__info}>
                <div className={s.info__container}>
                    <img src={props.profile.photos.large || image} className={s.info__avatar}></img>
                    {props.isOwner ? <UploadImage onMainPhotoSelected={onMainPhotoSelected} /> : ""}
                </div>
                <div className={s.info__infos}>
                    <div className={s.infos}>

                        <div>{`  FullName : ${props.profile.fullName}`}</div>
                        <div >{`  UserID : ${props.profile.userId}`}</div>
                        <div>{`  About Me : ${props.profile.aboutMe}`}</div>
                        <div>{`  Contact : ${props.profile.contacts.facebook}`}</div>
                        <div>{`  Carrier : ${(props.profile.lookingForAJob) ? `Looking for a job` : `Frontend developer \n with React `}`}</div>


                    </div>
                </div>
            </div>
            <ProfileStatusWithHooks userStatus={props.userStatus} updateStatusThunkCreator={props.updateStatusThunkCreator} />
        </div>)

}


export default Profileinfo;
