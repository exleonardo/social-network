import React , {ChangeEvent} from 'react';
import {addPostActionCreator , updateNewPostTextCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {StoreReduxType} from "../../../redux/redux-store";
import StoreContext from "../../../StoreContext";


export type PostsContainerTypeProps = {}

const MyPostsContainer = (props: PostsContainerTypeProps) => {

    return (
        <StoreContext.Consumer>
            {(store: StoreReduxType) => {
                const state = store.getState ()

                const addPost = () => {
                    store.dispatch ( addPostActionCreator ( state.profilePage.newPostText ) )
                }
                const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
                    store.dispatch ( updateNewPostTextCreator ( e.currentTarget.value ) )
                }
                return <MyPosts addPost={addPost}
                                updateNewPostText={onPostChange}
                                posts={store.getState ().profilePage.posts}
                                newPostText={store.getState ().profilePage.newPostText}/>
            }}
        </StoreContext.Consumer>
    );
};

export default MyPostsContainer;