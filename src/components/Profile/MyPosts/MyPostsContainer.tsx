import React , {ChangeEvent} from 'react';
import {addPostActionCreator , updateNewPostTextCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {StoreReduxType} from "../../../redux/redux-store";


export type PostsContainerTypeProps = {
    store: StoreReduxType
}

const MyPostsContainer = (props: PostsContainerTypeProps) => {
    let state = props.store.getState()
    const addPost = () => {
        props.store.dispatch ( addPostActionCreator ( state.profilePage.newPostText ) )
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.store.dispatch ( updateNewPostTextCreator ( e.currentTarget.value ) )
    }
    return (
        <MyPosts addPost={addPost} updateNewPostText={onPostChange} posts={state.profilePage.posts} newPostText={ state.profilePage.newPostText}/>
    );
};

export default MyPostsContainer;