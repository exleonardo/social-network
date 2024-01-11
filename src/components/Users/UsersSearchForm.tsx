import { memo, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { FormValues, requestUsers } from '@/redux/users-reducer'
import { Select } from 'antd'
import Search from 'antd/es/input/Search'
import { useFormik } from 'formik'
import { FormikHelpers } from 'formik/dist/types'

import s from './users.module.scss'

import { getPageSize, getUsersFilter } from './users-selectors'
export const UsersSearchForm = memo(() => {
  const dispatch = useAppDispatch()
  const pageSize = useAppSelector(getPageSize)
  const filter = useAppSelector(getUsersFilter)
  const selectData = [
    { label: 'All', value: '' },
    { label: 'Only followed', value: 'false' },
    { label: 'Only unfollowed', value: 'true' },
  ]
  const [options, setOptions] = useState(filter.friend)

  const submit = (value: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    const filter = { friend: options, term: value.term }

    onFilterChanged(filter)
    setSubmitting(false)
  }
  const formik = useFormik({
    initialValues: {
      friend: filter.friend,
      term: filter.term,
    },
    onSubmit: submit,
  })
  const onFilterChanged = (filter: FormValues) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  const onSearch = () => {
    formik.submitForm()
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <Search
            allowClear
            enterButton={'Search'}
            onSearch={onSearch}
            placeholder={'Find user'}
            size={'large'}
            style={{ width: '300px' }}
            {...formik.getFieldProps('term')}
          />
          <Select
            className={s.select}
            disabled={formik.isSubmitting}
            size={'large'}
            {...formik.getFieldProps('friend')}
            labelInValue={false}
            onChange={value => {
              setOptions(value)
            }}
            options={selectData}
            style={{ width: 200 }}
            value={options}
          />
        </div>
      </form>
    </>
  )
})
