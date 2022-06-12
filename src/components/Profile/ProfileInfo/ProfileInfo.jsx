import React, { useState } from 'react';
import Preloader from '../../common/Preloader';
import s from '../Profile.module.css';
import image from '../../images/image2.png';
import ProfileStatusWithHooks from '../ProfileStatus/ProfileStatusWithHooks';
import UploadImage from '../../common/UploadImage/UploadImage.jsx';
import background from '../../images/background.jpg';
import ProfileDataForm from './ProfileDataForm';



const Profileinfo = (props) => {

    let [editMode, setEditMode] = useState(false);


    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savedPhotoThunkCreator(e.target.files[0])
        }
    }

    const onSubmit = () => {
        setEditMode(false);

    }

    return (

        <div>

            <div className={s.maincontent__image}>
                <img src={background} alt=""></img>
            </div>

            <div className={s.maincontent__info}>
                <div className={s.info__container}>
                    <img src={props.profile.photos.large || image} className={s.info__avatar}></img>
                    {props.isOwner ? <UploadImage onMainPhotoSelected={onMainPhotoSelected} /> : ""}
                </div>

                {editMode
                    ? <ProfileDataForm profile={props.profile} saveChanges={props.saveChanges} onSubmit={onSubmit} />
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => setEditMode(true)} />}

            </div>
            <ProfileStatusWithHooks userStatus={props.userStatus} updateStatusThunkCreator={props.updateStatusThunkCreator} />
        </div>)

}



const ProfileData = (props) => {
    return (
        <div className={s.info__infos}>
            {props.isOwner && <div><button onClick={props.goToEditMode} className={s.button__edit}>Edit</button></div>}
            <div className={s.infos}>



                <div>{`About Me : ${props.profile.aboutMe}`}</div>
                <div>{`FullName : ${props.profile.fullName}`}</div>
                <div>{`Looking for a job : ${(props.profile.lookingForAJob)}`}</div>
                <div className={s.contacts_wrapper}>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />

                    })}
                </div>
            </div>
        </div>
    );
}

const Contacts = ({ contactTitle, contactValue }) => {
    return (

        <div>{contactTitle} : {contactValue}</div>

    );
}



export default Profileinfo;
