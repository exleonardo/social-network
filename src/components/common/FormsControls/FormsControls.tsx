import React from 'react'

import { Field } from 'redux-form'
import { WrappedFieldProps } from 'redux-form/lib/Field'

import s from './FormsControls.module.scss'

import { FieldValidatorType } from '../../../utils/validators'

export const Textarea: React.FC<WrappedFieldProps> = props => {
  const { input } = props

  return (
    <FormControl {...props}>
      <textarea {...input} {...props} />
    </FormControl>
  )
}

export const Input: React.FC<WrappedFieldProps> = props => {
  const { input } = props

  return (
    <FormControl {...props}>
      <input {...input} {...props} />
    </FormControl>
  )
}
const FormControl: React.FC<WrappedFieldProps> = ({ children, meta: { error, touched } }) => {
  const hasError = touched && error

  return (
    <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export function createField<FormKeysType extends string>(
  placeholder: null | string,
  name: FormKeysType,
  validators: [] | FieldValidatorType[],
  component: React.FC<WrappedFieldProps>,
  props: {
    type: string
  },
  text?: string
) {
  return (
    <div>
      <Field
        component={component}
        name={name}
        placeholder={placeholder}
        validate={validators}
        {...props}
      />
      {text}
    </div>
  )
}
