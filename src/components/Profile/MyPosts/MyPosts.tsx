import React , {memo} from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

import {Button , Input} from "antd";
import {useAppDispatch , useAppSelector} from "../../../redux/redux-store";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {getMyPosts , getNewPostText} from "../profile-selector";
import {useFormik} from "formik";


const MyPosts = memo ( () => {

  const { TextArea } = Input;
  const posts = useAppSelector ( getMyPosts )
  const dispatch = useAppDispatch ()

  const onAddPost = (value: AddNewPostFormType) => {
    dispatch ( addPostActionCreator ( value.newPostText ) )
  }
  const newPost = useAppSelector ( getNewPostText )
  const formik = useFormik ( {
    initialValues: {
      newPostText: newPost
    } , onSubmit: onAddPost
  } )

  const postsElements = posts.map ( el => <Post key={el.id} id={el.id} message={el.message}
                                                likesCount={el.likesCount}/> )


  return (
    <div className={s.postsBlock}><h3>My Posts</h3>
      <form onSubmit={formik.handleSubmit}>
        <TextArea
          {...formik.getFieldProps ( 'newPostText' )}
          showCount
          maxLength={100}
          placeholder="what's new"
          style={{ height: 120 , resize: 'none' }}/>
        <Button htmlType={'submit'}>add post</Button>
      </form>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
} );


export default MyPosts;
//type
type AddNewPostFormType = {
  newPostText: string
}