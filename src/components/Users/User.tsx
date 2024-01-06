import React from 'react';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/yoda_star_wars_icon_131348.png";

import {UsersInfoType} from "../../API/profile-api";
import {useAppDispatch , useAppSelector} from "../../redux/redux-store";
import {follow , unfollow} from "../../redux/users-reducer";
import {getFollowingInProgress} from "./users-selectors";

type UserTypeProps = {
  user: UsersInfoType;
}
export const User = ({ user }: UserTypeProps) => {

  const followingInProgress = useAppSelector ( getFollowingInProgress )
  const dispatch = useAppDispatch ()

  const unfollowUser = () => {
    dispatch ( unfollow ( user.id ) )
  }
  const followUser = () => {
    dispatch ( follow ( user.id ) )
  }
  return (
    <div>
     <span>
      <div>
       <NavLink to={'/profile/' + user.id}>
       <img src={user.photos.small ? user.photos.small : userPhoto} alt="avatar"/></NavLink>
      </div>
      <div>
      {user.followed
        ? <button
          disabled={followingInProgress.some ( (id) => id === user.id )}
          onClick={unfollowUser}>Follow</button>
        : <button
          disabled={followingInProgress.some ( (id) => id === user.id )}
          onClick={followUser}>Unfollow</button>}
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