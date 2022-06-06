import React from 'react';
import s from './Users.module.css'
import * as axios from 'axios';
import userAva from '../images/image.jpg'

const Users = (props) => {

    let getUsers = () => {
        if (props.book.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users?count=5').then((response) => {
                props.setUsers(response.data.items);
            })
        }
    }
    return (<div>
        <button onClick={getUsers} >Get a ride with me</button>
        {props.book.map(item => <div key={item.id}>
            <div className={s.wrapper}>
                <div className={s.item__wrapper}>
                    <div className={s.item__image}>
                        <div className={s.item__img}>
                            <img src={item.photos.small != null ? item.photos.small : userAva} />
                        </div>
                        <div className={s.item__button}>

                            {item.isRead

                                ? <button onClick={() => { props.read(item.id) }}><span>RIDE</span></button>
                                : <button onClick={() => { props.wantToRead(item.id) }}><span>Want to RIDE</span></button>}

                        </div>
                    </div>

                    <div className={s.item__message}>

                        <div className={s.item__message_flex}>
                            <div className={s.item__author}>{item.name}</div>
                            {/* <div className={s.item__location}>{item.location.city}</div> */}
                        </div>
                        <div className={s.item__quote}>{item.quote}</div>

                    </div>
                </div>
            </div>
        </div>)
        }
    </div>

    )
}
export default Users;



// {
//     id: 4,
//     isRead: true,
//     imageURL: 'https://366days.ru/media/article_images/3375/fj1Wly3pdEw.jpg',
//     author: 'Nikos Kazantzakis',
//     nameOfBook: `Zorbas the Greek`,
//     quote: `You have everything but one thing: madness. A man needs a little madness or else - he never dares cut the rope and be free.`,
//     location: { country: 'Greece', city: 'Crete' }
// }