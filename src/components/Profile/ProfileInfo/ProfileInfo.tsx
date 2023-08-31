import React from "react";
import s from "./ProfileInfo.module.css"


const ProfileInfo = () => {
    return (
        <div>
            <div className={s.images}><img
                src="https://image.wallperz.com/big_thumbs/wallperz.com_big_thumbs_v8ic75mj4xvwjo7k2vsiq03g1rxiix.jpg"
                alt="ava"/></div>
            <div className={s.descriptionBlock}>ava + descr</div>
        </div>
    );
};

export default ProfileInfo;