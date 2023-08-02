import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {
    ActionType,
    addPostActionCreator,
    PostsType,
    updateNewPostTextCreator,
} from '../../../redux/state';


export type PostsTypeProps = {
    posts: PostsType[]
    newPostText: string
    dispatch: (action: ActionType) => void
}

const MyPosts = (props: PostsTypeProps) => {
    const postsElements = props.posts.map((el, index) => <Post key={index} id={el.id} message={el.message}
                                                               likesCount={el.likesCount}/>)

    const addPost = () => {
        props.dispatch(addPostActionCreator(props.newPostText))
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewPostTextCreator(e.currentTarget.value))

    }
    return (
        <div className={s.postsBlock}><h3>My Posts</h3>
            <div>
                <div><textarea onChange={onPostChange} value={props.newPostText}/></div>
                <div>
                    <button onClick={addPost}>add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;