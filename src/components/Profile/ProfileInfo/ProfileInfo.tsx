import React from "react";
import s from "./ProfileInfo.module.css"
import {ProfileUserType} from "../../API/socialNetworkAPI";
import Preloader from "../../common/Preloader/Preloader";

type ProfileInfoType = {
    profile: null | ProfileUserType
}
const ProfileInfo = (props: ProfileInfoType) => {
    if ( !props.profile ) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.images}><img
                src="https://image.wallperz.com/big_thumbs/wallperz.com_big_thumbs_v8ic75mj4xvwjo7k2vsiq03g1rxiix.jpg"
                alt="ava"/></div>
            <div className={s.descriptionBlock}><img src={props.profile.photos.small} alt=""/> ava + Descr</div>
        </div>
    );
};

export default ProfileInfo;