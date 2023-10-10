import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileUserType} from "../../API/socialNetworkAPI";


type ProfileTypeProps = {
    profile: null | ProfileUserType;
    status: string;
    updateStatus: (status: string) => void;
}
const Profile: React.FC<ProfileTypeProps> = ({ profile , status , updateStatus }) => {
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;