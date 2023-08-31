import React from "react";
import s from "./Post.module.css"

type PostType = {
    message: string;
    likesCount: string
    id: string
}
const Post: React.FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://cdn.icon-icons.com/icons2/1070/PNG/72/stormtrooper_icon-icons.com_76962.png"
                alt="avatarLogo"/>
            {props.message}
            <div><span>like</span> {props.likesCount}</div>
        </div>
    );
};

export default Post;