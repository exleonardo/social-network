import { Button } from 'antd'

import s from './button-submit.module.scss'
type ButtonSubmitType = {
  isSubmitting?: boolean
  title: string
}
export const ButtonSubmit = ({ isSubmitting, title }: ButtonSubmitType) => {
  return (
    <div className={s.buttonSubmit}>
      <Button htmlType={'submit'} loading={isSubmitting}>
        {title}
      </Button>
    </div>
  )
}