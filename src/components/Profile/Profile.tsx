import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";


type ProfileTypeProps = {}
const Profile = (props: ProfileTypeProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;