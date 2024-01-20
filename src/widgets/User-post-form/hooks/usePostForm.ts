import { useAppDispatch, useAppSelector } from '@/app/store/redux-store'
import { getNewPostText } from '@/pages/Profile/selectors/profile-selector'
import { addPostActionCreator } from '@/redux/profile-reducer'
import { useFormik } from 'formik'

export const usePostForm = () => {
  const dispatch = useAppDispatch()

  const onAddPost = (value: { newPostText: string }) => {
    dispatch(addPostActionCreator(value.newPostText))
  }

  const newPost = useAppSelector(getNewPostText)
  const formik = useFormik({
    initialValues: {
      newPostText: newPost,
    },
    onSubmit: onAddPost,
  })

  return { formik }
}
