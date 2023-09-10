import React from 'react';
import {UsersType} from "./UsersContainer";
import axios from "axios";
import userPhoto from '../../assets/images/yoda_star_wars_icon_131348.png'


type UserPhoto = {
    small: string;
    large: string
}
type UsersGetType = {
    name: string,
    id: number,
    uniqueUrlName: string,
    photos: UserPhoto,
    status: string,
    followed: boolean
}
type Users = {
    items: UsersGetType[],
    totalCount: number,
    error: string
}
type Setting = {
    withCredentials: boolean;
}
const setting: Setting = {
    withCredentials: true ,
}
const Users = (props: UsersType) => {

    if ( props.users.length === 0 ) {
        axios.get ( "https://social-network.samuraijs.com/api/1.0/users/" , setting ).then ( (response) => {
            props.setUsers ( response.data.items )
            console.log ( response )
        } )
    }


    return (
        <div>
            {props.users.map ( (el) =>
                <div key={el.id}>
                    <span>
                        <div>
                            <img src={el.photos.small ? el.photos.small : userPhoto} alt="avatar"/>
                        </div>
                        <div>
                            {el.followed
                                ? <button onClick={() => {
                                    props.unfollow ( el.id )
                                }}>Follow</button>
                                : <button onClick={() => {
                                    props.follow ( el.id )
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
};

export default Users;