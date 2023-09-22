import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow ,
    setCurrentPage ,
    setUsers ,
    setUsersTotalCount , toggleIsFetching ,
    unfollow ,
    UsersInfoType
} from "../../redux/users-reducer";

import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";


type mapStateUsersToProps = {
    users: UsersInfoType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean
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
        this.props.toggleIsFetching ( true )
        axios.get <UserDataType> ( `https://social-network.samuraijs.com/api/1.0/users/?page=${this.props.currentPage}&count=${this.props.pageSize}` , setting ).then ( (response) => {
            this.props.setUsers ( response.data.items )
            this.props.setUsersTotalCount ( response.data.totalCount )
            this.props.toggleIsFetching ( false )
        } )
    }

    onPageChanged = (page: number) => {
        this.props.toggleIsFetching ( true )
        this.props.setCurrentPage ( page )
        axios.get <UserDataType> ( `https://social-network.samuraijs.com/api/1.0/users/?page=${page}&count=${this.props.pageSize}` , setting ).then ( (response) => {
            this.props.setUsers ( response.data.items )
            this.props.toggleIsFetching ( false )
        } )
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

            />
        </>
    }
}

export type UsersType = mapStateUsersToProps & MapDispatchUsersToProps
const mapStateToProps = (state: AppStateType): mapStateUsersToProps => {
    return {
        users: state.usersPage.users ,
        pageSize: state.usersPage.pageSize ,
        totalUsersCount: state.usersPage.totalUsersCount ,
        currentPage: state.usersPage.currentPage ,
        isFetching: state.usersPage.isFetching
    }
}
type MapDispatchUsersToProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersInfoType[]) => void;
    setCurrentPage: (pageNumber: number) => void;
    setUsersTotalCount: (totalCount: number) => void;
    toggleIsFetching: (isFetching: boolean) => void;
}
// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchUsersToProps => {
//     return {
//         follow: (userId: number) => {
//             dispatch ( follow ( userId ) )
//         } ,
//         unfollow: (userId: number) => {
//             dispatch ( unfollow ( userId ) )
//         } ,
//         setUsers: (users: UsersInfoType[]) => {
//             dispatch ( setUsers ( users ) )
//         } ,
//         setCurrentPage: (pageNumber: number) => {
//             dispatch ( setCurrentPage ( pageNumber ) )
//         } ,
//         setUsersTotalCount: (totalCount: number) => {
//             dispatch ( setUsersTotalCount ( totalCount ) )
//         } ,
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch ( toggleIsFetching ( isFetching ) )
//         }
//     }
// }
export default connect ( mapStateToProps , {
    follow ,
    unfollow ,
    setUsers ,
    setCurrentPage ,
    setUsersTotalCount ,
    toggleIsFetching
} ) ( UsersContainer )