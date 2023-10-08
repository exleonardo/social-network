import React from 'react';
import {Field , InjectedFormProps , reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from '../common/FormsControls/FormsControls.module.css'


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field validate={[required]} name={'login'} placeholder={'login'} component={Input}/></div>
            <div><Field validate={[required]} name={'password'} placeholder={'password'} type={'password'}
                        component={Input}/></div>
            <div><Field name={'rememberMe'} type="checkbox" component={Input}/>remember me</div>
            {props.error && <div className={s.formSummaryError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>

        </form>
    );
};
const LoginReduxForm = reduxForm<FormDataType> ( {
    form: 'login'
} ) ( LoginForm )

const Login = (props: LoginType) => {

    const onSubmit = (formData: FormDataType) => {
        const { login , password , rememberMe } = formData
        props.login ( login , password , rememberMe )
    }
    if ( props.isAuth ) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state: AppStateType): LoginMapStateToProps => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect ( mapStateToProps , { login } ) ( Login );
//type
type LoginMapDispatchToProps = {
    login: (email: string , password: string , rememberMe: boolean) => void
}
type LoginType = LoginMapDispatchToProps & LoginMapStateToProps
type LoginMapStateToProps = {
    isAuth: boolean
}
type FormDataType = {
    login: string;
    password: string;
    rememberMe: boolean
}