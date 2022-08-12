import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import s from '../Profile.module.css'
import { ProfileContactsType, ProfileType, updateProfileThunkCreator } from '../../../redux/postsReducer';
import { connect } from 'react-redux';
import { RootStateType } from '../../../redux/reduxStore';

type MapDispatchToPropsType = {
    updateProfileThunkCreator: (
        //initialValues: initialValuesType,
        profile: ProfileType,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
    ) => Promise<void>,
    profile: ProfileType
    onSubmit: () => Promise<void>
}


export type initialValuesType = {
    aboutMe: string
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
}

type PropsType = initialValuesType & MapDispatchToPropsType
const ProfileDataForm = (props: PropsType) => {

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
                    <Field name="aboutMe" as="textarea" />

                    <label htmlFor="fullName">Full name</label>
                    <Field name="fullName" type="text" />

                    <label htmlFor="lookingForAJobDescription">Looking for a job</label>
                    <Field name="lookingForAJobDescription" type="text" />

                    {Object.keys(props.profile.contacts).map(key => {
                        return <div>
                            <label htmlFor={"contacts." + key}>{key}</label>
                            <Field name={"contacts." + key} type="text" />
                        </div>
                    })}


                </div>

            </Form>

        )}
    </Formik >


}


export default connect<MapDispatchToPropsType>(null, { updateProfileThunkCreator })(ProfileDataForm);


