import React from 'react';
import s from './LoginPage.module.css';
import { connect } from 'react-redux';
import { logInThunkCreator } from '../redux/authReducer'
import { Navigate } from 'react-router-dom';
import { withRouter, WithAuthRedirect } from '../HOC/WithAuthRedirect';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

const LoginPage = (props) => {
    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }
    return (

        <div>
            <LoginPageForm {...props} />
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
            rememberMe: false,


        }}
        validationSchema={SignupSchema}
        onSubmit={(initialValues, { setFieldValue }) => {

            let email = initialValues.email;
            let password = initialValues.password;

            props.logInThunkCreator(email, password, setFieldValue);



        }}


    >

        {({ isSubmitting, errors, touched, initialValues }) => (

            <Form>

                <div className={s.wrapper}>
                    <h1 className={s.title}>LOGIN</h1>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="text" />
                    {errors.email && touched.email ? (
                        <div className={s.error}>{errors.email}</div>
                    ) : null}
                    <br />

                    <label htmlFor="password" >Password</label>
                    <Field name="password" type="password" />
                    {errors.password && touched.password ? (
                        <div className={s.error}>{errors.password}</div>
                    ) : null}

                    <Field className={s.checkbox} name="rememberMe" type="checkbox" />
                    <div ><label htmlFor="rememberMe">Remember Me</label></div>

                    <Field name="general" />

                    {initialValues.general ? <span>{initialValues.general}</span> : null}


                    <div>
                        <button type="submit" className={s.feedback__button} disabled={isSubmitting} >LOGIN </button>
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


