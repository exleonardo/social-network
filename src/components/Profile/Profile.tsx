import React , {ReactNode} from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileUserType} from "../../API/socialNetworkAPI";


type ProfileTypeProps = {
    children?: ReactNode;
    profile: null | ProfileUserType
}
const Profile = (props: ProfileTypeProps) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;