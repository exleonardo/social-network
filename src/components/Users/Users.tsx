import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersInfoType} from "../../API/profile-api";
import {UsersSearchForm} from "./UsersSearchForm";
import {FormValues} from "../../redux/users-reducer";

type UsersTypeProps = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (page: number , filter: FormValues) => void;
  users: UsersInfoType[];
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  toggleFollowingProgress: (isFetching: boolean , userId: number) => void
  followingInProgress: Array<number>
  onFilterChanged: (filter: FormValues) => void
  filter: FormValues

}
const Users = (
  {
    totalUsersCount ,
    pageSize ,
    currentPage ,
    onPageChanged ,
    users ,
    follow ,
    unfollow ,
    toggleFollowingProgress ,
    followingInProgress ,
    onFilterChanged ,
    filter ,
    ...props
  }: UsersTypeProps
) => {


  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <Paginator filter={filter} totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                 onPageChanged={onPageChanged}/>
      <div>
        {users.map ( (user) => <User key={user.id} followingInProgress={followingInProgress} follow={follow}
                                     unfollow={unfollow}
                                     user={user}/>
        )}
      </div>
    </div>
  );
};
export default Users;