
import React, { Component } from 'react';
import { actionDeletePoetry } from '../../../../redux/postsReducer';
import s from './Post.module.css';



class Post extends Component {

    render() {
        return (
            <div>
                <div className={s.style_wrapper} >
                    <div className={s.style_item}>
                        <div className={s.style_desc}>{this.props.desc}</div>
                        <img src="https://64.media.tumblr.com/63320c6efdd75e57b7b00190ab5aff8d/2852f9b2a324cd13-fb/s500x750/e6d9a9b40d368b9c642c952cf41adb53d1b702b3.jpg" alt="" ></img>

                    </div>

                </div>
            </div>
        );
    }
}

export default Post;




