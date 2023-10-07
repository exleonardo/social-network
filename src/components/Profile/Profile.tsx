import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileUserType} from "../../API/socialNetworkAPI";


type ProfileTypeProps = {
    profile: null | ProfileUserType;
    status: string;
    updateStatus: (status: string) => void;
}
const Profile = (props: ProfileTypeProps) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;