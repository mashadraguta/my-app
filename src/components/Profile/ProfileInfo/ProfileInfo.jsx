import React from 'react';
import Preloader from '../../common/Preloader';
import s from '../Profile.module.css';
import image from '../../images/image.jpg';
import ProfileStatusWithHooks from '../ProfileStatus/ProfileStatusWithHooks';



const Profileinfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }
    // let profileElements = props.profileInfo.map(item => <div className={s.infos_text}>{item.text}</div>);
    return (

        <div >
            <div className={s.maincontent__image}>
                <img src="https://64.media.tumblr.com/fa25cb008890f21c7d65018bd300a14c/753bf278597a4ffd-ee/s500x750/b63c8465f21ef5c71fff7ac1b979dd32acac7860.jpg" alt=""></img>
            </div>
            <div className={s.maincontent__info}>
                <div className={s.info__avatar}>
                    <img src={props.profile.photos.large == null ? image : props.profile.photos.large} alt=""></img>
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
