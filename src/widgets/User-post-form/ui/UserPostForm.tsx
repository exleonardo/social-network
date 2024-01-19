import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getNewPostText } from '@/pages/Profile/selectors/profile-selector'
import { addPostActionCreator } from '@/redux/profile-reducer'
import { Button } from '@/shared/Button/ui/Button'
import { Input } from '@/shared/Input/ui/Input'
import { useFormik } from 'formik'

type UserPostFormType = {
  className?: string
}
export const UserPostForm = ({ className }: UserPostFormType) => {
  const dispatch = useAppDispatch()

  const onAddPost = (value: AddNewPostFormType) => {
    dispatch(addPostActionCreator(value.newPostText))
  }

  const newPost = useAppSelector(getNewPostText)
  const formik = useFormik({
    initialValues: {
      newPostText: newPost,
    },
    onSubmit: onAddPost,
  })

  return (
    <>
      {
        <form className={className} onSubmit={formik.handleSubmit}>
          <Input {...formik.getFieldProps('newPostText')} />
          <Button>Add Post</Button>
        </form>
      }
    </>
  )
}

type AddNewPostFormType = {
  newPostText: string
}
