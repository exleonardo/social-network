import React from 'react'
import { Redirect } from 'react-router-dom'

import { InjectedFormProps, reduxForm } from 'redux-form'

import s from '../common/FormsControls/FormsControls.module.scss'

import { login } from '../../redux/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store'
import { required } from '../../utils/validators'
import { Input, createField } from '../common/FormsControls/FormsControls'
import { getInitialized, getIsAuth } from './login-selectors'

const LoginForm: React.FC<PropsLoginForm & InjectedFormProps<FormDataType, PropsLoginForm>> = ({
  captchaUrl,
  error,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('login', 'login', [required], Input, { type: 'text' })}
      {createField<LoginFormValuesTypeKeys>('password', 'password', [required], Input, {
        type: 'password',
      })}
      {createField<LoginFormValuesTypeKeys>(
        null,
        'rememberMe',
        [],
        Input,
        { type: 'checkbox' },
        'remember me'
      )}
      {captchaUrl && <img alt={'captcha'} src={captchaUrl} />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {
          type: 'text',
        })}
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}
const LoginReduxForm = reduxForm<FormDataType, PropsLoginForm>({
  form: 'login',
})(LoginForm)

export const Login = () => {
  const isAuth = useAppSelector(getIsAuth)
  const captchaUrl = useAppSelector(getInitialized)
  const dispatch = useAppDispatch()
  const onSubmit = (formData: FormDataType) => {
    dispatch(login(formData.login, formData.password, formData.rememberMe, formData.captcha))
  }

  if (isAuth) {
    return <Redirect to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit} />
    </div>
  )
}

//type

export type FormDataType = {
  captcha: null | string
  login: string
  password: string
  rememberMe: boolean
}
type PropsLoginForm = {
  captchaUrl: null | string
}
type LoginFormValuesTypeKeys = keyof FormDataType
