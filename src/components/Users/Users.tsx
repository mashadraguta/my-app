import React from 'react';
import s from './Users.module.css'
//import userAva from '../images/image2.png'
import { Link } from 'react-router-dom';
import { UsersArrayType } from '../../redux/usersReducer';
import Paginator from '../common/Paginator/Paginator';

const userAva = require('../images/image2.png');
//const s = require('./Users.module.css');


type Props = {

    onPageChanged: (selectedPage: number) => void
    pageSize: number
    totalItemsCount: number
    currentPage?: number
    users: Array<UsersArrayType>
    followingInProgress: Array<number>
    unfollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
}



const Users: React.FC<Props> = (props) => {

    return (

        <div>

            <Paginator currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                totalItemsCount={props.totalItemsCount}
                pageSize={props.pageSize}

            />

            {props.users.map(item => <div key={item.id}>
                <div className={s.wrapper}>
                    <div className={s.item__wrapper}>
                        <div className={s.item__image}>

                            <Link to={`/profile/` + item.id}>

                                <div className={s.item__img}>
                                    <img src={item.photos.small != null ? item.photos.small : userAva} />
                                </div>
                            </Link>
                            <div className={s.item__button}>
                                {item.followed ?
                                    <button disabled={props.followingInProgress.some(id => id === item.id)} onClick={() => {

                                        props.unfollowThunkCreator(item.id)

                                    }}>unfollow</button>

                                    : <button disabled={props.followingInProgress.some(id => id === item.id)} onClick={() => {
                                        props.followThunkCreator(item.id)
                                    }}>follow</button>
                                }
                            </div>
                        </div>


                        <div className={s.item__message}>

                            <div className={s.item__message_flex}>
                                <div className={s.item__author}>{item.name}</div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>)
            }
        </div >
    );
}

export default Users;


{/* <button disabled={props.followingInProgress.some(id => id === item.id)} onClick={() => {
    //we pick up an id by pushing the button, then some method returns true, because the id is already here
    // so it will be disabled=={true}
    // disabled becomes true only when we pick an id, that allow only the pushed button became disabled

 */}









