import {FormikHelpers} from "formik/dist/types";
import {useFormik} from "formik";
import React , {memo , useState} from "react";
import {FormValues , requestUsers} from "../../redux/users-reducer";
import {useAppDispatch , useAppSelector} from "../../redux/redux-store";
import {getPageSize , getUsersFilter} from "./users-selectors";
import Search from "antd/es/input/Search";
import {Select} from "antd";
import s from './users.module.css'

const usersSearchValidate = (values: FormValues): FormValues => {
  const errors = {} as FormValues
  return errors;
}

export const UsersSearchForm = memo ( () => {
  const dispatch = useAppDispatch ()
  const pageSize = useAppSelector ( getPageSize )
  const filter = useAppSelector ( getUsersFilter )
  const selectData = [{ value: '' , label: 'All' } ,
    { value: 'false' , label: 'Only followed' } , { value: 'true' , label: 'Only unfollowed' }]
  const [options , setOptions] = useState ( filter.friend )

  const submit = (value: FormValues , { setSubmitting }: FormikHelpers<FormValues>) => {
    const filter = { term: value.term , friend: options }
    onFilterChanged ( filter )
    setSubmitting ( false );
  }
  const formik = useFormik ( {
    initialValues: {
      term: filter.term ,
      friend: filter.friend
    } ,
    onSubmit: submit
  } )
  const onFilterChanged = (filter: FormValues) => {
    dispatch ( requestUsers ( 1 , pageSize , filter ) )
  }

  const onSearch = () => {
    formik.submitForm ()
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: "flex" , alignItems: 'center' }}>
          <Search
            style={{ width: '300px' }}
            placeholder="Find user"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            {...formik.getFieldProps ( 'term' )}
          />
          <Select
            size={'large'}
            className={s.select}
            disabled={formik.isSubmitting}
            {...formik.getFieldProps ( 'friend' )}
            labelInValue={false}
            style={{ width: 200 }}
            onChange={(value) => {
              setOptions ( value )
            }}
            options={selectData}
            value={options}
          />
        </div>


      </form>

    </>)
} )