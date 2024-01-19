import { memo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/redux-store'
import { getPageSize, getUsersFilter } from '@/components/users-selectors'
import { FindUser } from '@/features/Find-user/FindUser'
import { UserSubscriptionSelect } from '@/features/User-subscription-select/UserSubscriptionSelect'
import { FormValues, requestUsers } from '@/redux/users-reducer'
import { useFormik } from 'formik'
import { FormikHelpers } from 'formik/dist/types'

import s from './users-search-form.module.scss'

export const UsersSearchForm = memo(() => {
  const dispatch = useAppDispatch()
  const pageSize = useAppSelector(getPageSize)
  const filter = useAppSelector(getUsersFilter)
  const submit = (value: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    const filterValue = { friend: filter.friend, term: value.term }

    onFilterChanged(filterValue)
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
    <form onSubmit={formik.handleSubmit}>
      <div className={s.searchUser}>
        <FindUser onSearch={onSearch} {...formik.getFieldProps('term')} />
        <UserSubscriptionSelect
          isSubmitting={formik.isSubmitting}
          onSearch={onSearch}
          {...formik.getFieldProps('friend')}
        />
      </div>
    </form>
  )
})
