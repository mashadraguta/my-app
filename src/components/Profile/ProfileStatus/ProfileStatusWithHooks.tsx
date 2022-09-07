

import React, { useState, useEffect } from 'react';
import s from './ProfileStatus.module.css'




const SpanHover = () => {
    return (
        <div>
            <div className={s.spanHoverComp}>doubleclick to change status</div>
        </div>
    );
}


type MapStateToPropsType ={
    userStatus:string | undefined
}
type MapDispatchToPropsType ={
    updateStatusThunkCreator : (userStatus:string | undefined) => void
}
type PropsType =MapStateToPropsType & MapDispatchToPropsType


const ProfileStatusWithHooks:React.FC<PropsType> = (props) => {

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
    const onStatusChange = (e: { currentTarget: { value: any; }; }) => {
        setStatus(e.currentTarget.value);
    }


    return (
        <div className={s.wrapper}>
            {!editMode &&
                <div className={s.statusCont}>
                    <div className={s.statusDiv}>Hello! How do you feel today?</div>
                    <div onDoubleClick={activateEditMode} className={s.statusSpan}>
                        <div className={s.container}>
                            <span className={s.spanHoverComp}>doubleclick to change status</span>
                        </div>
                        <div className={s.statusHover}>{props.userStatus || "the rain"}</div>
                    </div>

                </div>
            }
            {editMode &&
                <div>
                    <div className={s.statusDiv}>Hello! How do you feel today?</div>
                    <input onBlur={deactivateEditMode}
                        className={s.statusInput}
                        onChange={onStatusChange}
                        value={userStatus}></input></div>
            }

        </div>

    );
}


export default ProfileStatusWithHooks;
