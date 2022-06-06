import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const ValidationSchemaExample = () => (
    <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                    ) : null}
                    <Field name="lastName" />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                    <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);



//В компоненте LoginForm:
const onSubmit = (values, { setFieldValue }) => {
    /// some code
    props.login(values.email, values.password, values.rememberMe, setFieldValue);
}

//В редюсере: 
export const authUserLogin = (email, password, rememberMe, setFieldValue) => dispatch => {
    authAPI.login(email, password, rememberMe).then(content => {

        if (content.resultCode === 0) {
            dispatch(getAuthUserData());
        }
        else {
            setFieldValue("general", content.messages.join(" "))
        }

    })

}

//В компоненте LoginForm в самой форме:


{ values.general ? <span>{values.general}</span> : null }
