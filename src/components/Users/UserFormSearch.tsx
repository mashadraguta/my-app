import React from 'react';
import { Field, Formik, FormikValues } from 'formik';
import s from './Users.module.css'
import { FilterType } from '../../redux/usersReducer';

const validateForm = (values: FormikValues) => {

    const errors = {}
    return errors

}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UserFormSearch: React.FC<PropsType> = (props) => {
    return (
        <div>
            <Formik
                initialValues={{ term: '' }}
                validate={validateForm}
                onSubmit={(values, { setSubmitting }) => {
                    props.onFilterChanged(values)
                }}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                }) => (
                    <form onSubmit={handleSubmit}>

                        <div className={s.formSearch}>
                            <input
                                type="text"
                                name="term"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.term}
                                className={s.input_Search}
                            />

                            <Field name="friend" as="select">
                                <option value="all">all</option>
                                <option value="followed">followed</option>
                                <option value="unfollowed">unfollowed</option>

                            </Field>
                            <button type="submit" disabled={isSubmitting} className={s.btn_Search}>
                                Search
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default UserFormSearch