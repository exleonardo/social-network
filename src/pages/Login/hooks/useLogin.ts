import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getCaptchaUrl, getIsAuth } from '@/pages/Login/selectors/auth-selectors'
import { clearCaptchaUrl, login } from '@/redux/auth-reducer'
import { useFormik } from 'formik'

export const useLogin = () => {
  const isAuth = useAppSelector(getIsAuth)
  const captcha = useAppSelector(getCaptchaUrl)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      captcha: '',
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: (formData, formikHelpers) => {
      formikHelpers.setSubmitting(true)
      dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
        .then(res => {
          if (res.length) {
            formik.setFieldError('email', res)
          } else if (res.login) {
            /* empty */
          }
          formik.setFieldError(res.field, res.error)
        })
        .finally(() => {
          formikHelpers.setSubmitting(false)
          dispatch(clearCaptchaUrl())
        })
    },
  })

  return { captcha, formik, isAuth }
}
