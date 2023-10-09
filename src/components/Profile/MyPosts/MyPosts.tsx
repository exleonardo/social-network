import React , {memo} from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {PostsTypeProps} from "./MyPostsContainer";
import {Field , InjectedFormProps , reduxForm} from "redux-form";
import {maxLengthCreator , required} from "../../../utils/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator ( 10 )
const MyPosts = memo ( (props: PostsTypeProps) => {
    const postsElements = props.posts.map ( el => <Post key={el.id} id={el.id} message={el.message}
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
} );

export const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field placeholder={'Post message'} name={"newPostText"} component={Textarea}
                    validate={[required , maxLength10]}/></div>
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