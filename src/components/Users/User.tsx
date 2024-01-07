import React from 'react';
import {NavLink , useHistory} from "react-router-dom";
import userPhoto from "../../assets/images/yoda_star_wars_icon_131348.png";

import {UsersInfoType} from "../../API/profile-api";
import {useAppDispatch} from "../../redux/redux-store";
import {follow , unfollow} from "../../redux/users-reducer";
import {Button , Popconfirm} from "antd";

type UserTypeProps = {
  user: UsersInfoType;
}
export const User = ({ user }: UserTypeProps) => {


  const dispatch = useAppDispatch ()
  const history = useHistory ()
  const moveToProfile = () => {
    history.push ( `profile/${user.id}` )
  }
  const unfollowUser = () => {
    return dispatch ( unfollow ( user.id ) )
  }
  const followUser = () => {
    return dispatch ( follow ( user.id ) )
  }
  return (
    <div>
     <span>
      <div>
       <NavLink onClick={moveToProfile} to={{}}>
       <img src={user.photos.small ? user.photos.small : userPhoto} alt="avatar"/></NavLink>
      </div>
      <div>
      {user.followed
        ? <Popconfirm
          title={'Get Exclusive Content Only for Subscribers!'}
          description="Are you sure you want to subscribe?"
          onConfirm={unfollowUser}
        > <Button type={'primary'}
        >Follow</Button></Popconfirm>
        : <Popconfirm
          title={'We\'re sorry that you want to unsubscribe from our updates.'}
          description="Are you sure you want to unsubscribe"
          onConfirm={followUser}
        > <Button
        >Unfollow</Button></Popconfirm>}
      </div>
     </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
      </span>
    </div>
  );
};
