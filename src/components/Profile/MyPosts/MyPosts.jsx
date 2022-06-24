
import React, { Component } from 'react';
import Post from './Posts/Post';
import s from './MyPosts.module.css';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import PostValidationForm from '../../common/ValidationForm/PostValidationForm';

let maxLength10 = maxLengthCreator(300);

const MyPostsForm = (props) => {

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <Field component={PostValidationForm}
                    placeholder="type poetry here"
                    type={"input"}
                    className={s.feedback__input}
                    name={"newMess"}
                    validate={[required, maxLength10]}
                />
                <button className={s.feedback__button} >SEND</button>

            </form>
        </div>
    );
}


class MyPosts extends Component {

   

    render() {
        window.props = this.props;
        let postsElements = [...this.props.posts]
            .reverse()
            .map(p => <Post desc={p.desc} key={p.id} />);
        let onAddMess = (formData) => {

            this.props.addPoetry(formData.newMess);
        }
        
        return (

            <div className={s.postsBlock}>
                <div className={s.title}>My posts</div>
                <MyPostsFormRedux onSubmit={onAddMess} />
                <div className={s.item}>
                    {postsElements}
                </div>

            </div>
        );
    }
}


const MyPostsFormRedux = reduxForm({ form: 'message' })(MyPostsForm)

export default MyPosts;







