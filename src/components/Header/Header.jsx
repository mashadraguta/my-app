import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from '../common/Preloader';
import { toggleFetching } from '../../redux/usersReducer.ts';


const Header = (props) => {

    return (

        <div className={s.header}>
            <div className={s.header__logo}>
                <img src='./img/00.jpg'></img>

                <div className={s.login}>

                    {(props.isAuth) ? <NavLink to='/profile'><button className={s.botton}>{(props.email) ? props.email : 'LOG OUT'}</button>
                        <button onClick={props.logOutThunkCreator} className={s.botton}> LOGOUT</button></NavLink>

                        : <NavLink to='/auth'><button className={s.botton}>{'LOG IN'}</button></NavLink>}



                </div>
            </div>


        </div>
    )
}

export default Header;