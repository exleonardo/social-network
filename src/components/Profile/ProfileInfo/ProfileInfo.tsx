import React from "react";
import s from "./ProfileInfo.module.css"
import {ProfileUserType} from "../../../API/socialNetworkAPI";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./profileStatusWithHooks";

type ProfileInfoType = {
    profile: null | ProfileUserType;
    status: string;
    updateStatus: (status: string) => void;
}
const ProfileInfo = (props: ProfileInfoType) => {
    if ( !props.profile ) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}><img src={props.profile.photos.small} alt=""/> <ProfileStatusWithHooks
                updateStatus={props.updateStatus}
                status={props.status}/></div>
        </div>
    );
};

export default ProfileInfo;