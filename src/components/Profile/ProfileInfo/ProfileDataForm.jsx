import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import s from '../Profile.module.css'
import { updateProfileThunkCreator } from '../../../redux/postsReducer';
import { connect } from 'react-redux';



const ProfileDataForm = (props) => {

    const validateEmail = (value) => {
        // let error;
        // if (!value) {
        //     error = 'Required';
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        //     error = 'Invalid email address';
        // }
        // return error;
    }

    return <Formik

        initialValues={{
            aboutMe: '',
            lookingForAJobDescription: '',
            fullName: '',
            contacts: {
                facebook: '',
                website: '',
                vk: '',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: '',
            }

        }
        }

        onSubmit={(initialValues, { setFieldValue }) => {
            props.updateProfileThunkCreator(initialValues, setFieldValue).then(
                () => {
                    props.onSubmit()
                }

            );

        }}>


        {({ initialValues, errors }) => (

            <Form className={s.infos}>
                <div><button type="submit" className={s.button__edit}>Save</button></div>

                <div>

                    <label htmlFor="aboutMe">About me</label>
                    <Field name="aboutMe" as="textarea" placeholder={initialValues.aboutMe} validate={validateEmail} />

                    <label htmlFor="fullName">Full name</label>
                    <Field name="fullName" type="text" />

                    <label htmlFor="lookingForAJobDescription">Looking for a job</label>
                    <Field name="lookingForAJobDescription" type="text" />

                    {Object.keys(props.profile.contacts).map(key => {
                        return <div >

                            <label htmlFor={"contacts." + key}>{key}</label>
                            <Field name={"contacts." + key} type="text" />
                        </div>
                    })}


                </div>

            </Form>

        )}
    </Formik >


}


export default connect(null, { updateProfileThunkCreator })(ProfileDataForm);



//enableReinitialize

