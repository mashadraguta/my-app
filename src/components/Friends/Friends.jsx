import React, { useState, useEffect } from 'react';
import s from './Friends.module.css';
import { NavLink } from 'react-router-dom';


const Counter = (props) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            console.log(`You clicked ${count} times`);
        }, 3000);
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <button onClick={() => setCount(0)}>
                Reset me
            </button>
        </div>
    );
}

const Friends = (props) => {
    return (
        <div className={s.text}>
            <h1><NavLink to='/friends' className={s.activeLink}>Books</NavLink></h1>
            <div className={s.diff}>

                <div className={s.diff_item}>
                    <img src="http://surl.li/bvckk" alt="" />
                    <div className={s.author_name}>Zen and the art of motorcycle maintenance</div>
                </div>
                <div className={s.diff_item}>
                    <img src="http://surl.li/bvcls" alt="" />
                    <div className={s.author_name}>L'Usage du monde</div>
                </div>
                <div className={s.diff_item}>
                    <img src="http://surl.li/bvcmc" alt="" />
                    <div className={s.author_name}>Zorba the Greek</div>
                </div>
            </div>

            <Counter />


        </div>
    );
}

export default Friends;
