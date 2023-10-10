import React from 'react';
import {InjectedFormProps , reduxForm} from "redux-form";
import {createField , Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from '../common/FormsControls/FormsControls.module.css'


const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({ error , handleSubmit }) => {

    return (
        <form onSubmit={handleSubmit}>
            {createField ( 'login' , 'login' , [required] , Input , { type: 'text' } )}
            {createField ( 'password' , 'password' , [required] , Input , { type: 'password' } )}
            {createField ( null , 'rememberMe' , [] , Input , { type: 'checkbox' } , "remember me" )}
            {error && <div className={s.formSummaryError}>{error}</div>}
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