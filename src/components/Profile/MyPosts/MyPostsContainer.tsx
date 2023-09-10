import {ChangeEvent} from 'react';
import {addPostActionCreator , updateNewPostTextCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import store , {AppStateType} from "../../../redux/redux-store";
import {PostsType} from "../../../redux/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


export type  PostsTypeProps = MapStatePostToProps & MapDispatchPostsToProps

export type MapStatePostToProps = {
    posts: PostsType[];
    newPostText: string
}
const mapStatePostsToProps = (state: AppStateType): MapStatePostToProps => {
    return {
        posts: state.profilePage.posts ,
        newPostText: state.profilePage.newPostText
    }
}
export type MapDispatchPostsToProps = {
    addPost: () => void
    updateNewPostText: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
const mapDispatchPostsToProps = (dispatch: Dispatch): MapDispatchPostsToProps => {
    return {
        addPost: () => dispatch ( addPostActionCreator ( store.getState ().profilePage.newPostText ) ) ,
        updateNewPostText: (e: ChangeEvent<HTMLTextAreaElement>) => {
            dispatch ( updateNewPostTextCreator ( e.currentTarget.value ) )
        }
    }
}
const MyPostsContainer = connect ( mapStatePostsToProps , mapDispatchPostsToProps ) ( MyPosts )
export default MyPostsContainer;