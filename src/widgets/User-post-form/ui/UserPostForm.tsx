import { Button } from '@/shared/Button/ui/Button'
import { Input } from '@/shared/Input/ui/Input'
import { usePostForm } from '@/widgets/User-post-form/hooks/usePostForm'
import { clsx } from 'clsx'

import s from '../style/index.module.scss'
type UserPostFormType = {
  className?: string
}
export const UserPostForm = ({ className }: UserPostFormType) => {
  const { formik } = usePostForm()
  const classes = clsx(className, s.form)

  return (
    <>
      {
        <form className={classes} onSubmit={formik.handleSubmit}>
          <Input className={s.input} {...formik.getFieldProps('newPostText')} />
          <Button className={s.button}>Add Post</Button>
        </form>
      }
    </>
  )
}
