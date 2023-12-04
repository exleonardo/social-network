import React from "react";
import {WrappedFieldProps} from "redux-form/lib/Field";
import s from './FormsControls.module.css'
import {Field} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators";


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input } = props
  return <FormControl {...props}><textarea {...input} {...props}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input } = props
  return <FormControl  {...props}><input {...input} {...props}/></FormControl>
}
const FormControl: React.FC<WrappedFieldProps> = (
  {
    children ,
    meta: { touched , error }
  }) => {
  const hasError = touched && error
  return <div className={s.formControl + ' ' + (hasError ? s.error : "")}>
    <div>{children}</div>
    {hasError && <span>{error}</span>}
  </div>
}


export function createField<FormKeysType extends string>(placeholder: string | null , name: FormKeysType , validators: FieldValidatorType[] | [] , component: React.FC<WrappedFieldProps> , props: {
  type: string
} , text?: string) {
  return <div>
    <Field
      validate={validators}
      name={name}
      placeholder={placeholder}
      component={component} {...props}/>{text}
  </div>
}
