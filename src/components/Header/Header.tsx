import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import image from '../images/img2.jpg'


export type MapStateToPropsType = {
    email: string | null
    isAuth: boolean
}
export type MapDispatchToPropsType = {
    logOutThunkCreator: () => void

}
export type PropsType = MapStateToPropsType & MapDispatchToPropsType


const Header: React.FC<PropsType> = (props) => {

    return (

        <div className={s.header}>
            <div className={s.header__logo}>
                <img src={image} alt="logo-image" />

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