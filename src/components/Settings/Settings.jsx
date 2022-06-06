import React from 'react';
import s from './Settings.module.css';


const Settings = () => {
    return (
        <div>
            <ul className={s.list}>
                <li><a href="">Connect to the Source</a></li>
                <li><a href="">Ride to the FarAways</a></li>
                <li><a href="">Stay emottional away from humans</a> </li>
                <li><a href="">Birds,sky, plants are the answer</a></li>
            </ul>
        </div>
    );
}

export default Settings;
