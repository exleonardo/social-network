import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionType, ProfilePageType} from '../../redux/state';


type ProfileTypeProps = {
    dispatch: (action: ActionType) => void
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