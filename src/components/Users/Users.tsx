import React from "react";
import userPhoto from "../../assets/images/yoda_star_wars_icon_131348.png";
import axios from "axios";
import {UsersType} from "./UsersContainer";
import {UsersInfoType} from "../../redux/users-reducer";
import s from './Users.module.css'


type UserDataType = {
    items: UsersInfoType[],
    totalCount: number;
    error: string;
}
type Setting = {
    withCredentials: boolean;
}
const setting: Setting = {
    withCredentials: true ,
}

class Users extends React.Component<UsersType> {
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
        let pagesCount = Math.ceil ( this.props.totalUsersCount / this.props.pageSize )
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push ( i )
        }
        return (
            <div>
                <div>
                    {pages.map ( (el , index) => {
                        return <span key={index}
                                     className={this.props.currentPage === el ? s.selectedPage : ''}
                                     onClick={() => this.onPageChanged ( el )}

                        >{el}
                            </span>
                    } )}
                </div>
                {this.props.users.map ( (el) =>
                    <div key={el.id}>
                    <span>
                        <div>
                            <img src={el.photos.small ? el.photos.small : userPhoto} alt="avatar"/>
                        </div>
                        <div>
                            {el.followed
                                ? <button onClick={() => {
                                    this.props.unfollow ( el.id )
                                }}>Follow</button>
                                : <button onClick={() => {
                                    this.props.follow ( el.id )
                                }}>Unfollow</button>}
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{el.name}</div>
                            <div>{el.status}</div></span>
                        <span>
                            <div>{"el.location.country"}</div>
                            <div>{"el.location.city"}</div>
                        </span>
                    </span>
                    </div> )}
            </div>
        );
    }
}

export default Users