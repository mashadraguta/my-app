import React from "react";
import { Field, Formik, FormikValues, Form } from "formik";
import s from "./Users.module.css";
import { FilterType } from "../../redux/usersReducer";

//@ts ignore
const validateForm = (values: FormikValues) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const UserFormSearch: React.FC<PropsType> = React.memo((props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        term: "",
        friend: "",
      }}
      validate={validateForm}
      onSubmit={(initialValues: FilterType, { setSubmitting }) => {
        props.onFilterChanged(initialValues);
        setSubmitting(false);
      }}
    >
      {({
        initialValues,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form>
          <div className={s.formSearch}>
            <Field name="term" type="text" />
            <Field name="friend" as="select">
              <option value="null">all</option>
              <option value="true">followed</option>
              <option value="false">unfollowed</option>
            </Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className={s.btn_Search}
            >
              Search
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
});

export default UserFormSearch;
