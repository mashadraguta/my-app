import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import PostValidationForm from '../common/ValidationForm/PostValidationForm';
import { maxLengthCreator, required } from '../../utils/validators/validators';

let maxLength30 = maxLengthCreator(300);

export const AddMessageForm = (props) => {
    return (


        <form onSubmit={props.handleSubmit}>
            <div className={s.item}>
                <Field className={s.textarea}
                    component={PostValidationForm}
                    name={"newPostMessage"}
                    placeholder={"newPostMessage"}
                    validate={[required, maxLength30]}
                />

                <button className={s.button} type="submit">SEND</button>

            </div>
        </form>
    );
}




const Dialogs = (props) => {


    let onAddPost = (formData) => {
        console.log(formData)
        props.addPost(formData.newPostMessage);
    }

    let dialogsData = props.dialogsPage.map(d =>
        <DialogItem name={d.name} id={d.id} />,
    )
    let messagesData = props.messagesPage.map(m =>
        <Message id={m.id} text={m.text} />
    )


    // if (!props.isAuth) {
    //     return <Navigate to="/login" />
    // }
    return (
        <div className={s.wrapper}>
            <div className={s.dialogsItems}>
                {dialogsData}
            </div>
            <div className={s.messages}>
                {messagesData}
            </div>
            <AddMessageReduxForm onSubmit={onAddPost} />
        </div>
    );

}
const AddMessageReduxForm = reduxForm({ form: 'post' })(AddMessageForm)


export default Dialogs;



