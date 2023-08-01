import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {AddPostType, PostsType, UpdateNewPostTextType} from '../../../redux/state';


export type PostsTypeProps = {
    posts: PostsType[]
    newPostText: string
    dispatch: (action: AddPostType | UpdateNewPostTextType) => void
}

const MyPosts = (props: PostsTypeProps) => {
    const postsElements = props.posts.map((el, index) => <Post key={index} id={el.id} message={el.message}
                                                               likesCount={el.likesCount}/>)

    const addPost = () => {
        props.dispatch({type: 'ADD-POST', newPostText: props.newPostText})
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', postMessage: e.currentTarget.value})

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