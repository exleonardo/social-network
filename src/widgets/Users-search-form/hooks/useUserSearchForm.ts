import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getPageSize, getUsersFilter } from '@/pages/Users/selectors/users-selectors'
import { FormValues, requestUsers } from '@/redux/users-reducer'
import { useFormik } from 'formik'
import { FormikHelpers } from 'formik/dist/types'

export const useUserSearchForm = () => {
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

  return { formik, onSearch }
}
