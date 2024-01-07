import React from "react";
import s from "./Post.module.css"
import {Button , message , Popconfirm} from "antd";
import {DeleteOutlined , HeartFilled} from "@ant-design/icons";
import {useAppDispatch} from "../../../../redux/redux-store";
import {deletePostActionCreator} from "../../../../redux/profile-reducer";


type PostType = {
  message: string;
  likesCount: string
  id: number
}
const Post: React.FC<PostType> = (props) => {
  const dispatch = useAppDispatch ()
  const [messageApi , contextHolder] = message.useMessage ();


  const cancel = () => {
    message.info ( 'the post has not been deleted' );
  };

  const deleteMessage = () => {
    message.success ( 'post deleted' , 2 )
    dispatch ( deletePostActionCreator ( props.id ) )
  }
  return (
    <div className={s.item}>
      {contextHolder}
      <img
        src="https://cdn.icon-icons.com/icons2/1070/PNG/72/stormtrooper_icon-icons.com_76962.png"
        alt="avatarLogo"/>
      {props.message}
      <Popconfirm
        title="Delete the post"
        description="Are you sure to delete this post?"
        onConfirm={deleteMessage}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button
          size={'small'}
          icon={<DeleteOutlined rev={undefined}/>}/></Popconfirm>
      <div><Button style={{ border: 'none' , background: 'none' }}
                   icon={<HeartFilled rev={undefined}/>}>{props.likesCount}</Button>
      </div>

    </div>
  );
};
//<HeartFilled /> <HeartOutlined rev={undefined}/>
export default Post;