import React from 'react';
import s from './PostValidationForm.module.css';



const PostValidationForm = ({ input, meta, ...props }) => {
    const compromised = meta.touched && meta.error;
    return (

        <div>
            <div className={s.wrapper + " " + (compromised ? s.error : "")}>
                <input {...input} {...props} />
            </div>


            <div className={s.text}>{compromised && <span>{meta.error}</span>}</div>


        </div >
    );
}








export default PostValidationForm;
