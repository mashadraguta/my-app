import React from 'react';
import s from './LoginPage.module.css';
import { connect } from 'react-redux';
import { logInThunkCreator, getCaptchaThunkCreator } from '../redux/authReducer.ts'
import { Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha,

})

const LoginPage = (props) => {
    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }
    return (

        <div>
            <LoginPageForm {...props} captcha={props.captcha} />
        </div>
    );
}


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .required('Password is required'),

});


const LoginPageForm = (props) => {

    return <Formik

        initialValues={{
            email: '',
            password: '',
            general: '',
            captcha: '',
            rememberMe: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(initialValues, { setFieldValue }) => {

            let email = initialValues.email;
            let password = initialValues.password;
            let captcha = initialValues.captcha;


            props.logInThunkCreator(email, password, captcha, setFieldValue);

        }}>

        {({ isSubmitting, errors, touched, initialValues }) => (
            <Form>

                <div className={s.wrapper}>

                    <h1 className={s.title}>LOGIN</h1>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="text" className={s.input__loginPage} />
                    {errors.email && touched.email ? (
                        <div className={s.error}>{errors.email}</div>
                    ) : null}
                    <br />

                    <label htmlFor="password" >Password</label>
                    <Field name="password" type="password" />
                    {errors.password && touched.password ? (
                        <div className={s.error}>{errors.password}</div>
                    ) : null}



                    <Field name="captcha" type="text" />
                    {props.captcha ? <img src={props.captcha}></img> : ""}
                    <Field name="general" type="textarea" />
                    <div>
                        <button type="submit" className={s.feedback__button} >LOGIN </button>
                    </div>


                </div>
            </Form>
        )}
    </Formik >
}



export default connect(mapStateToProps, { logInThunkCreator })(LoginPage);




// const maxLength30 = maxLengthCreator(30);


// const LoginForm = (props) => {


//     return (

//         <form onSubmit={props.handleSubmit}>
//             <div>
//                 <Field placeholder={'email'} name={"email"}
//                     component={PostValidationForm} type={'textarea'}
//                     validate={[required, maxLength30]} />
//             </div>
//             <div>
//                 <Field placeholder={'password'} name={"password"}
//                     type={'input' && 'password'}
//                     component={PostValidationForm}
//                     validate={[required, maxLength30]} />
//             </div>
//             <div>
//                 <Field type={'checkbox'} name={"rememberMe"}
//                     component={'input'} /> remember me
//             </div>
//             <div>
//                 <button> Log In</button>
//             </div>
//         </form>

//     );
// }


// const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)



// const LoginPage = (props) => {
//     return (
//         <div>
//             <h1 className={s.title}>Login</h1>
//             <LoginPageForm />
//         </div>
//     );
// }


