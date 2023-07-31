import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../redux/state';


type ProfileTypeProps = {
    profilePage: ProfilePageType
    addPost: () => void
    updateNewPostText: (postMessage: string) => void
}
const Profile = (props: ProfileTypeProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts updateNewPostText={props.updateNewPostText} posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText} addPost={props.addPost}/>
        </div>
    );
};

export default Profile;