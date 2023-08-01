import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {AddPostType, ProfilePageType, UpdateNewPostTextType} from '../../redux/state';


type ProfileTypeProps = {
    dispatch: (action: AddPostType | UpdateNewPostTextType) => void
    profilePage: ProfilePageType
}
const Profile = (props: ProfileTypeProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts dispatch={props.dispatch} posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}/>
        </div>
    );
};

export default Profile;