import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {PostsType} from '../../../redux/state';


export type PostsTypeProps = {
    posts: PostsType[]
    addPost: (postMessage: string) => void
}

const MyPosts = (props: PostsTypeProps) => {
    const postsElements = props.posts.map((el, index) => <Post key={index} id={el.id} message={el.message}
                                                               likesCount={el.likesCount}/>)
    let newPostElement = React.createRef<HTMLTextAreaElement>()
    const addPost = () => {
        let text = newPostElement.current?.value;
        if (text) {
            props.addPost(text)
        }
    }
    return (
        <div className={s.postsBlock}><h3>My Posts</h3>
            <div>
                <div><textarea ref={newPostElement}/></div>
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