

import React, { useState, useEffect } from 'react';
import s from './ProfileStatus.module.css'


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [userStatus, setStatus] = useState(props.userStatus);

    useEffect(() => {

        setStatus(props.userStatus)

    }, [props.userStatus])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatusThunkCreator(userStatus);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }


    return (
        <div className={s.wrapper}>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode} >
                        {props.userStatus || "no more crying in the rain"}
                    </span>
                </div>
            }
            {editMode &&
                <div><input onBlur={deactivateEditMode}
                    onChange={onStatusChange}
                    value={userStatus}></input></div>
            }

        </div>

    );
}


export default ProfileStatusWithHooks;
