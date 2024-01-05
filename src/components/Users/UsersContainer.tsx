import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
  follow ,
  FormValues ,
  requestUsers ,
  setCurrentPage ,
  toggleFollowingProgress ,
  unfollow ,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
  getCurrentPage ,
  getFollowingInProgress ,
  getIsFetching ,
  getPageSize ,
  getTotalUsersCount ,
  getUsers ,
  getUsersFilter
} from "../../redux/users-selectors";
import {UsersInfoType} from "../../API/profile-api";


class UsersContainer extends React.Component<UsersType> {
  componentDidMount() {
    const { currentPage , pageSize , requestUsers , filter } = this.props
    requestUsers ( currentPage , pageSize , filter )
  }

  onPageChanged = (page: number , filter: FormValues) => {
    const { pageSize , requestUsers } = this.props
    requestUsers ( page , pageSize , filter )
  }

  onFilterChanged = (filter: FormValues) => {
    const { pageSize , requestUsers } = this.props
    requestUsers ( 1 , pageSize , filter )
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
             onFilterChanged={this.onFilterChanged}
             toggleFollowingProgress={this.props.toggleFollowingProgress}
             followingInProgress={this.props.followingInProgress}
             filter={this.props.filter}
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
    followingInProgress: getFollowingInProgress ( state ) ,
    filter: getUsersFilter ( state )
  }
}
export default compose<React.ComponentType> ( connect ( mapStateToProps , {
  follow ,
  unfollow ,
  setCurrentPage ,
  toggleFollowingProgress ,
  requestUsers
} ) ) ( UsersContainer )

//type
type mapStateUsersToProps = {
  users: UsersInfoType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  filter: FormValues
}
type MapDispatchUsersToProps = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setCurrentPage: (pageNumber: number) => void;
  toggleFollowingProgress: (isFetching: boolean , userId: number) => void;
  requestUsers: (currentPage: number , pageSize: number , filter: FormValues) => void
}
export type UsersType = mapStateUsersToProps & MapDispatchUsersToProps