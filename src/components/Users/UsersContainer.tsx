import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow , getUsers ,
    setCurrentPage ,
    toggleFollowingProgress , unfollow ,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {UsersInfoType} from "../API/socialNetworkAPI";


class UsersContainer extends React.Component<UsersType> {
    componentDidMount() {
        this.props.getUsers ( this.props.currentPage , this.props.pageSize )
    }

    onPageChanged = (page: number) => {
        this.props.getUsers ( page , this.props.pageSize )
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
        users: state.usersPage.users ,
        pageSize: state.usersPage.pageSize ,
        totalUsersCount: state.usersPage.totalUsersCount ,
        currentPage: state.usersPage.currentPage ,
        isFetching: state.usersPage.isFetching ,
        followingInProgress: state.usersPage.followingInProgress
    }
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
    setCurrentPage ,
    toggleFollowingProgress ,
    getUsers
} ) ( UsersContainer );

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
    getUsers: (currentPage: number , pageSize: number) => void
}
export type UsersType = mapStateUsersToProps & MapDispatchUsersToProps