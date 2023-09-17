import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    followAC ,
    setCurrentPageAC ,
    setUsersAC ,
    setUsersTotalCountAC ,
    unfollowAC ,
    UsersInfoType
} from "../../redux/users-reducer";

import React from "react";
import axios from "axios";
import Users from "./Users";


type mapStateUsersToProps = {
    users: UsersInfoType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number
}
type UserDataType = {
    items: UsersInfoType[],
    totalCount: number;
    error: string;
}
type Headers = {
    [key: string]: string;

}
type Setting = {
    withCredentials: boolean;
    headers: Headers
}
const setting: Setting = {
    headers: {
        "API-KEY": "f3eb22c4-26f8-436d-a4bb-37315a600abf"
    } ,
    withCredentials: true ,
}

class UsersContainer extends React.Component<UsersType> {
    componentDidMount() {
        axios.get <UserDataType> ( `https://social-network.samuraijs.com/api/1.0/users/?page=${this.props.currentPage}&count=${this.props.pageSize}` , setting ).then ( (response) => {
            this.props.setUsers ( response.data.items )
        } )
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage ( page )
        axios.get <UserDataType> ( `https://social-network.samuraijs.com/api/1.0/users/?page=${page}&count=${this.props.pageSize}` , setting ).then ( (response) => {
            this.props.setUsers ( response.data.items )
            this.props.setTotalUsersCount ( response.data.totalCount )
        } )
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}

        />
    }
}

export type UsersType = mapStateUsersToProps & MapDispatchUsersToProps
const mapStateToProps = (state: AppStateType): mapStateUsersToProps => {
    return {
        users: state.usersPage.users ,
        pageSize: state.usersPage.pageSize ,
        totalUsersCount: state.usersPage.totalUsersCount ,
        currentPage: state.usersPage.currentPage
    }
}
type MapDispatchUsersToProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersInfoType[]) => void;
    setCurrentPage: (pageNumber: number) => void;
    setTotalUsersCount: (totalCount: number) => void
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchUsersToProps => {
    return {
        follow: (userId: number) => {
            dispatch ( followAC ( userId ) )
        } ,
        unfollow: (userId: number) => {
            dispatch ( unfollowAC ( userId ) )
        } ,
        setUsers: (users: UsersInfoType[]) => {
            dispatch ( setUsersAC ( users ) )
        } ,
        setCurrentPage: (pageNumber: number) => {
            dispatch ( setCurrentPageAC ( pageNumber ) )
        } ,
        setTotalUsersCount: (totalCount: number) => {
            dispatch ( setUsersTotalCountAC ( totalCount ) )
        }
    }
}
export default connect ( mapStateToProps , mapDispatchToProps ) ( UsersContainer )