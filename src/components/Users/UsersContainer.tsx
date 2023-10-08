import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {follow , requesUsers , setCurrentPage , toggleFollowingProgress , unfollow ,} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {UsersInfoType} from "../../API/socialNetworkAPI";
import {compose} from "redux";
import {
    getCurrentPage , getFollowingInProgress ,
    getIsFetching ,
    getPageSize ,
    getTotalUsersCount ,
    getUsers
} from "../../redux/users-selectors";


class UsersContainer extends React.Component<UsersType> {
    componentDidMount() {
        this.props.requesUsers ( this.props.currentPage , this.props.pageSize )
    }

    onPageChanged = (page: number) => {
        this.props.requesUsers ( page , this.props.pageSize )
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): mapStateUsersToProps => {
    return {
        users: getUsers ( state ) ,
        pageSize: getPageSize ( state ) ,
        totalUsersCount: getTotalUsersCount ( state ) ,
        currentPage: getCurrentPage ( state ) ,
        isFetching: getIsFetching ( state ) ,
        followingInProgress: getFollowingInProgress ( state )
    }
}
export default compose<React.ComponentType> ( connect ( mapStateToProps , {
    follow ,
    unfollow ,
    setCurrentPage ,
    toggleFollowingProgress ,
    requesUsers
} ) ) ( UsersContainer )

//type
type mapStateUsersToProps = {
    users: UsersInfoType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
}
type MapDispatchUsersToProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void;
    toggleFollowingProgress: (isFetching: boolean , userId: number) => void;
    requesUsers: (currentPage: number , pageSize: number) => void
}
export type UsersType = mapStateUsersToProps & MapDispatchUsersToProps