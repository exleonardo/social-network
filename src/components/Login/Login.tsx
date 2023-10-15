import React from 'react';
import {InjectedFormProps , reduxForm} from "redux-form";
import {createField , Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from '../common/FormsControls/FormsControls.module.css'


const LoginForm: React.FC<PropsLoginForm & InjectedFormProps<FormDataType , PropsLoginForm>> = ({ error , handleSubmit , captchaUrl }) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys> ( 'login' , 'login' , [required] , Input , { type: 'text' } )}
            {createField<LoginFormValuesTypeKeys> ( 'password' , 'password' , [required] , Input , { type: 'password' } )}
            {createField<LoginFormValuesTypeKeys> ( null , 'rememberMe' , [] , Input , { type: 'checkbox' } , "remember me" )}
            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && createField ( 'Symbols from image' , 'captcha' , [required] , Input , { type: 'text' } )}
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

const Login = (props: LoginType) => {

    const onSubmit = (formData: FormDataType) => {
        const { login , password , rememberMe , captcha } = formData
        
        props.login ( login , password , rememberMe , captcha )
    }
    if ( props.isAuth ) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state: AppStateType): LoginMapStateToProps => {
    return {
        isAuth: state.auth.isAuth ,
        captchaUrl: state.auth.captchaUrl
    }
}
export default connect ( mapStateToProps , { login } ) ( Login );
//type
type LoginMapDispatchToProps = {
    login: (email: string , password: string , rememberMe: boolean , captcha: string | null) => void
}
type LoginType = LoginMapDispatchToProps & LoginMapStateToProps
type LoginMapStateToProps = {
    isAuth: boolean;
    captchaUrl: string | null
}
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