import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {PostsTypeProps} from "./MyPostsContainer";
import {Field , InjectedFormProps , reduxForm} from "redux-form";


const MyPosts = (props: PostsTypeProps) => {
    const postsElements = props.posts.map ( (el , index) => <Post key={index} id={el.id} message={el.message}
                                                                  likesCount={el.likesCount}/> )
    const onAddPost = (values: AddNewPostFormType) => {
        props.addPost ( values.newPostText );
    }
    return (
        <div className={s.postsBlock}><h3>My Posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field name={"newPostText"} component={'textarea'}/></div>
        <div>
            <button>add post</button>
        </div>
    </form>
}
const AddNewPostFormRedux = reduxForm<AddNewPostFormType> ( { form: 'ProfileAddNewPostForm' } ) ( AddNewPostForm )
export default MyPosts;
//type
type AddNewPostFormType = {
    newPostText: string
}