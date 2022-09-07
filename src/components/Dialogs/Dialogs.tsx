import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import PostValidationForm from '../common/ValidationForm/PostValidationForm';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { DialogsPageType, MessagesPageType } from '../../redux/dialogsReducer';


let maxLength30 = maxLengthCreator(300);

export type NewMessageFormValuesType = {
    newPostMessage: string
}

export const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType>> = (props) => {
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

export type PropsType = {
    dialogsPage: Array<DialogsPageType>
    messagesPage: Array<MessagesPageType>
    addPost: (newPostMessage: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    let onAddPost = (formData: NewMessageFormValuesType) => {

        props.addPost(formData.newPostMessage);
    }

    let dialogsData = props.dialogsPage.map(d =>
        <DialogItem name={d.name} id={d.id} />,
    )
    let messagesData = props.messagesPage.map(m =>
        <Message id={m.id} text={m.text} />
    )

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
const AddMessageReduxForm = reduxForm<NewMessageFormValuesType>({ form: 'post' })(AddMessageForm)


export default Dialogs;



