import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Dialogs.module.css';

const Dialogitem = (props) => {
    return (
        <div className={`${s.nameSS} ${s.active}`}>
        <NavLink to={props.id} className={s.nameSS}>{props.name}</NavLink>
    </div>
    );
}

export default Dialogitem;
