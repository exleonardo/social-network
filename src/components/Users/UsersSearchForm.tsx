import {FormikHelpers} from "formik/dist/types";
import {Field , Form , Formik} from "formik";
import React , {memo} from "react";
import {FormValues} from "../../redux/users-reducer";


const usersSearchValidate = (values: FormValues): FormValues => {
  const errors = {} as FormValues
  return errors;
}
type UsersSearchFormType = {
  onFilterChanged: (filter: FormValues) => void
}
export const UsersSearchForm = memo ( ({ onFilterChanged }: UsersSearchFormType) => {
  const submit = (value: FormValues , { setSubmitting }: FormikHelpers<FormValues>) => {
    onFilterChanged ( value )
    setSubmitting ( false );
  }

  return (
    <div>
      <Formik
        initialValues={{ term: '' , friend: '' }}
        validate={usersSearchValidate}
        onSubmit={submit}
      >
        {({
            errors ,
            touched ,
            isSubmitting ,
          }) => (
          <Form>
            <Field type="text" name="term"/>
            {touched.term && errors.term && <div>{errors.term}</div>}
            <Field name="friend" as="select">
              <option value={''}>All</option>
              <option value={'true'}>Only followed</option>
              <option value={'false'}>Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>

    </div>)
} )