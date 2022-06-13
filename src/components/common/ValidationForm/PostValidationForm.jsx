import React from 'react';
import s from './PostValidationForm.module.css';
import classnames from 'classnames';


const PostValidationForm = ({ input, meta, ...props }) => {
    const compromised = meta.touched && meta.error;
    return (

        <div>
            <div className={classnames(
                {
                    [s.wrapper]: true,
                    [s.error]: compromised
                }
            )}><input {...input} {...props} /></div>

            <div className={s.text}>{compromised && <span>{meta.error}</span>}</div>


        </div >
    );
}








export default PostValidationForm;
