import { memo } from 'react'

import { getInitialized } from '@/components/Login/auth-selectors'
import { getIsFetching } from '@/components/Users/users-selectors'
import Preloader from '@/components/common/Preloader/Preloader'
import { addPostActionCreator } from '@/redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '@/redux/redux-store'
import { Button, Input } from 'antd'
import { useFormik } from 'formik'

import s from './myPosts.module.scss'

import { getMyPosts, getNewPostText } from '../profile-selector'
import Post from './Post/Post'

const MyPosts = memo(() => {
  const { TextArea } = Input
  const posts = useAppSelector(getMyPosts)
  const dispatch = useAppDispatch()
  const initialized = useAppSelector(getInitialized)
  const isFetching = useAppSelector(getIsFetching)
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

  const postsElements = posts.map(el => (
    <Post id={el.id} key={el.id} likesCount={el.likesCount} message={el.message} />
  ))

  if (isFetching || initialized) {
    return <Preloader fullscreen={false} />
  }

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <form onSubmit={formik.handleSubmit}>
        <TextArea
          {...formik.getFieldProps('newPostText')}
          maxLength={100}
          placeholder={"what's new"}
          showCount
          style={{ height: 120, resize: 'none' }}
        />
        <Button htmlType={'submit'}>add post</Button>
      </form>
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
})

export default MyPosts
//type
type AddNewPostFormType = {
  newPostText: string
}
