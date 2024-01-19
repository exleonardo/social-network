import { Redirect } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getCaptchaUrl, getIsAuth } from '@/pages/Login/selectors/auth-selectors'
import { clearCaptchaUrl, login } from '@/redux/auth-reducer'
import { Checkbox } from 'antd'
import { useFormik } from 'formik'

import s from '../style/index.module.scss'

export const Login = () => {
  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()

  const captcha = useAppSelector(getCaptchaUrl)

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

  if (isAuth) {
    return <Redirect to={'/'} />
  }

  return (
    <>
      <form className={s.loginForm} onSubmit={formik.handleSubmit}>
        <div className={s.loginText}>Login</div>
        <div className={s.description}>
          To log in get registered <a href={'https://social-network.samuraijs.com/'}>here</a> or use
          common test account credentials:<p>Email: free@samuraijs.com</p> <p>Password: free</p>
        </div>
        <div>
          <input
            {...formik.getFieldProps('email')}
            autoFocus
            className={s.loginUsername}
            placeholder={'Email'}
          />
          {formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
          <input
            {...formik.getFieldProps('password')}
            className={s.loginPassword}
            placeholder={'Password'}
            type={'password'}
          />
          {formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
        </div>

        {captcha && (
          <div className={s.captcha}>
            <img alt={'captcha'} src={captcha} />
            <input {...formik.getFieldProps('captcha')} className={s.loginPassword} type={'text'} />
            <div style={{ color: 'red' }}>{formik.errors.captcha}</div>
          </div>
        )}
        <div className={s.rememberMe}>
          <Checkbox
            className={s.checkbox}
            {...formik.getFieldProps('rememberMe')}
            checked={formik.values.rememberMe}
          >
            Remember me
          </Checkbox>
          <a
            className={s.loginForgotPass}
            href={'https://social-network.samuraijs.com/'}
            rel={'noreferrer'}
            target={'_blank'}
          >
            forgot password?
          </a>
        </div>
        <button className={s.button} disabled={formik.isSubmitting} type={'submit'}>
          login
        </button>
      </form>

      <div className={s.underlayPhoto}></div>
      <div className={s.underlayBlack}></div>
    </>
  )
}
