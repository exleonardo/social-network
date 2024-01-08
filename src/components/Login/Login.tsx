import React from 'react';
import {InjectedFormProps , reduxForm} from "redux-form";
import {createField , Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {useAppDispatch , useAppSelector} from "../../redux/redux-store";
import s from '../common/FormsControls/FormsControls.module.css'
import {getInitialized , getIsAuth} from "./login-selectors";


const LoginForm: React.FC<PropsLoginForm & InjectedFormProps<FormDataType , PropsLoginForm>> = (
  {
    error ,
    handleSubmit ,
    captchaUrl
  }) => {

  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys> ( 'login' , 'login' , [required] , Input , { type: 'text' } )}
      {createField<LoginFormValuesTypeKeys> ( 'password' , 'password' , [required] , Input , { type: 'password' } )}
      {createField<LoginFormValuesTypeKeys> ( null , 'rememberMe' , [] , Input , { type: 'checkbox' } , "remember me" )}
      {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
      {captchaUrl && createField<LoginFormValuesTypeKeys> ( 'Symbols from image' , 'captcha' , [required] , Input , { type: 'text' } )}
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};
const LoginReduxForm = reduxForm<FormDataType , PropsLoginForm> ( {
  form: 'login'
} ) ( LoginForm )


export const Login = () => {
  const isAuth = useAppSelector ( getIsAuth )
  const captchaUrl = useAppSelector ( getInitialized )
  const dispatch = useAppDispatch ()
  const onSubmit = (formData: FormDataType) => {
    dispatch ( login ( formData.login , formData.password , formData.rememberMe , formData.captcha ) )
  }
  if ( isAuth ) {
    return <Redirect to={'/profile'}/>
  }
  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
  </div>
}

//type

export type FormDataType = {
  login: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null
}
type PropsLoginForm = {
  captchaUrl: string | null
}
type LoginFormValuesTypeKeys = keyof FormDataType