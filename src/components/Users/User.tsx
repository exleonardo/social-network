import React from 'react';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/yoda_star_wars_icon_131348.png";

import {UsersInfoType} from "../../API/profile-api";

type UserTypeProps = {
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  user: UsersInfoType;
}
const User: React.FC<UserTypeProps> = ({ user , followingInProgress , follow , unfollow }) => {
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
                                onClick={() => follow ( user.id )}>Follow</button>
                              : <button
                                disabled={followingInProgress.some ( (id) => id === user.id )}
                                onClick={() => unfollow ( user.id )}>Unfollow</button>}
                        </div>
                    </span>
      <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div></span>
                    </span>
    </div>
  );
};

export default User;