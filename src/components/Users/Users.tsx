import React from 'react';
import {UsersInfoType} from "../../API/socialNetworkAPI";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


type UsersTypeProps = {
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (page: number) => void;
    users: UsersInfoType[];
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    toggleFollowingProgress: (isFetching: boolean , userId: number) => void
    followingInProgress: Array<number>

}
const Users: React.FC<UsersTypeProps> = (
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
        ...props
    }
) => {


    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
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