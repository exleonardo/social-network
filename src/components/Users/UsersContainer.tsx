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
import Users from "./Users";

type mapStateUsersToProps = {
    users: UsersInfoType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number
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
const UsersContainer = connect ( mapStateToProps , mapDispatchToProps ) ( Users )
export default UsersContainer