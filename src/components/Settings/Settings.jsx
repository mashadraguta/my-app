import React from 'react';
import ComponentTemplate from '../../HOC/ComponentTemplate';
import s from './Settings.module.css';


const Settings = () => {
    return (
        <div>
            <ul className={s.list}>
                <ComponentTemplate></ComponentTemplate>

            </ul>
        </div>
    );
}

export default Settings;
