import {FormikHelpers} from "formik/dist/types";
import {Field , Form , Formik} from "formik";
import React , {memo} from "react";
import {FormValues , requestUsers} from "../../redux/users-reducer";
import {useAppDispatch , useAppSelector} from "../../redux/redux-store";
import {getPageSize , getUsersFilter} from "./users-selectors";


const usersSearchValidate = (values: FormValues): FormValues => {
  const errors = {} as FormValues
  return errors;
}

export const UsersSearchForm = memo ( () => {
  const dispatch = useAppDispatch ()
  const pageSize = useAppSelector ( getPageSize )
  const filter = useAppSelector ( getUsersFilter )
  console.log ( filter )
  const onFilterChanged = (filter: FormValues) => {
    dispatch ( requestUsers ( 1 , pageSize , filter ) )
  }
  const submit = (value: FormValues , { setSubmitting }: FormikHelpers<FormValues>) => {
    onFilterChanged ( value )
    setSubmitting ( false );
  }

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{ term: filter.term , friend: filter.friend }}
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
              <option value={'false'}>Only followed</option>
              <option value={'true'}>Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>

    </div>)
} )