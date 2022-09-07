import React, { useState } from 'react';
import Preloader from '../../common/Preloader';
import s from '../Profile.module.css';
import image from '../../images/image2.png';
import ProfileStatusWithHooks from '../ProfileStatus/ProfileStatusWithHooks';
import UploadImage from '../../common/UploadImage/UploadImage.jsx';
//import * as background from '../../images/background.jpg';
import ProfileDataForm from './ProfileDataForm';
import { ProfileContactsType, ProfileType } from '../../../types/types';


const background = require('../../images/background.jpg');

type MapStateToProps = {
    profile: ProfileType
    goToEditMode?: () => void
    isOwner: boolean
    userStatus?: string
}
type MapDispachToProps = {
    savedPhotoThunkCreator: (files: string | any[]) => void
    updateStatusThunkCreator: () => void
    onSubmit: () => Promise<void>

}

type PropsType = MapStateToProps & MapDispachToProps

const Profileinfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);


    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: { target: { files: string | any[] } }) => {
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
                    ? <ProfileDataForm profile={props.profile} onSubmit={onSubmit} aboutMe={''} fullName={''} lookingForAJobDescription={''} updateProfileThunkCreator={function (profile: Omit<ProfileType, 'photos'>, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void): Promise<void> {
                        throw new Error('Function not implemented.');
                    }} contacts={{
                        github: '',
                        vk: '',
                        facebook: '',
                        instagram: '',
                        twitter: '',
                        website: '',
                        youtube: '',
                        mainLink: ''
                    }} />
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => setEditMode(true)} />}

            </div>
            <ProfileStatusWithHooks userStatus={props.userStatus}
                updateStatusThunkCreator={props.updateStatusThunkCreator} />
        </div>)

}



const ProfileData: React.FC<MapStateToProps> = (props) => {
    return (
        <div className={s.info__infos}>
            {props.isOwner && <div><button onClick={props.goToEditMode} className={s.button__edit}>Edit</button></div>}
            <div className={s.infos}>



                <div>{`About Me : ${props.profile.aboutMe}`}</div>
                <div>{`FullName : ${props.profile.fullName}`}</div>
                <div>{`Looking for a job : ${(props.profile.lookingForAJob)}`}</div>
                <div className={s.contacts_wrapper}>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contacts key={key}
                            contactTitle={key}
                            contactValue={props.profile.contacts[key as keyof ProfileContactsType]} />

                    })}
                </div>
            </div>
        </div>
    );
}

type ContactsType = {
    contactTitle: string
    contactValue: string
}


const Contacts: React.FC<ContactsType> = ({ contactTitle, contactValue }) => {
    return (

        <div>{contactTitle} : {contactValue}</div>

    );
}



export default Profileinfo;



//saveChanges={props.saveChanges} 