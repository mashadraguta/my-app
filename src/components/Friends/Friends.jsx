import React, { useState, useEffect } from 'react';
import s from './Friends.module.css';
import { NavLink } from 'react-router-dom';


const Friends = (props) => {
    return (
        <div className={s.text}>
            <h1><NavLink to='/friends' className={s.activeLink}>Books</NavLink></h1>
            

        </div>
    );
}

export default Friends;



