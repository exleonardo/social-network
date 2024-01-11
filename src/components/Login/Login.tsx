import { Redirect } from 'react-router-dom'

import { login } from '@/redux/auth-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Checkbox, Input } from 'antd'
import { useFormik } from 'formik'

import { getIsAuth } from './login-selectors'

const LoginForm = ({}) => {
  // const captchaUrl = useAppSelector(getInitialized)
  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      captcha: '',
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: formData => {
      dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    },
  })

  if (isAuth) {
    return <Redirect to={'/'} />
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input placeholder={'Enter email'} {...formik.getFieldProps('email')} />
      <Input.Password
        {...formik.getFieldProps('password')}
        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        placeholder={'Enter password'}
      />
      <Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe}>
        remember me
      </Checkbox>
      <Button htmlType={'submit'}>submit</Button>
    </form>
  )
}

export const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
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
