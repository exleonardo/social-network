import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";
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
    addPost: (values: string) => void
}
const mapDispatchPostsToProps = (dispatch: Dispatch): MapDispatchPostsToProps => {
    return {
        addPost: (values: string) => dispatch ( addPostActionCreator ( values ) ) ,
    }
}
const MyPostsContainer = connect ( mapStatePostsToProps , mapDispatchPostsToProps ) ( MyPosts )
export default MyPostsContainer;