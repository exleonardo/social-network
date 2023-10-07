import React from 'react';
import {Field , InjectedFormProps , reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";

type FormDataType = {
    login: string;
    password: string;
    rememberMe: boolean
}
const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field validate={[required]} name={'login'} placeholder={'login'} component={Input}/></div>
            <div><Field validate={[required]} name={'password'} placeholder={'password'} component={Input}/></div>
            <div><Field name={'rememberMe'} type="checkbox" component={Input}/>remember me</div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm<FormDataType> ( {
    form: 'login'
} ) ( LoginForm )
const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log ( formData )
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;