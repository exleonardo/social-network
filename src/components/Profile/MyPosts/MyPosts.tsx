import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType} from '../../../redux/state';


export type PostsTypeProps = {
    posts:PostsType[]
}

const MyPosts = (props:PostsTypeProps) => {
  const postsElements = props.posts.map((el) => <Post id={ el.id } message={ el.message } likesCount={ el.likesCount }/>)

  return (
    <div className={ s.postsBlock }><h3>My Posts</h3>
      <div>
        <div><textarea></textarea></div>
        <div>
          <button>add post</button>
        </div>
      </div>
      <div className={ s.posts }>
        { postsElements }
      </div>
    </div>
  );
};

export default MyPosts;