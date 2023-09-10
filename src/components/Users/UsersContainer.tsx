import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC , setUsersAC , unfollowAC , UsersInfoType} from "../../redux/users-reducer";
import Users from "./Users";

type mapStateUsersToProps = {
    users: UsersInfoType[]
}
export type UsersType = mapStateUsersToProps & MapDispatchUsersToProps
const mapStateToProps = (state: AppStateType): mapStateUsersToProps => {
    return {
        users: state.usersPage.users
    }
}
type MapDispatchUsersToProps = {
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UsersInfoType[]) => void
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchUsersToProps => {
    return {
        follow: (userId: string) => {
            dispatch ( followAC ( userId ) )
        } ,
        unfollow: (userId: string) => {
            dispatch ( unfollowAC ( userId ) )
        } ,
        setUsers: (users: UsersInfoType[]) => {
            dispatch ( setUsersAC ( users ) )
        }
    }
}
const UsersContainer = connect ( mapStateToProps , mapDispatchToProps ) ( Users )
export default UsersContainer