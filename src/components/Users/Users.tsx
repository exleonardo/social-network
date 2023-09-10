import React from "react";
import userPhoto from "../../assets/images/yoda_star_wars_icon_131348.png";
import axios from "axios";
import {UsersType} from "./UsersContainer";

type Setting = {
    withCredentials: boolean;
}
const setting: Setting = {
    withCredentials: true ,
}

class Users extends React.Component<UsersType> {
    constructor(props: UsersType) {
        super ( props );
        axios.get ( "https://social-network.samuraijs.com/api/1.0/users/" , setting ).then ( (response) => {
            this.props.setUsers ( response.data.items )
        } )

    }
    

    render() {
        return (
            <div>
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