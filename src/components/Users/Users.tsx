import React from 'react';

import s from "./Users.module.css"
import {UsersType} from "./UsersContainer";


const Users = (props: UsersType) => {
    if ( props.users.length === 0 ) {
        props.setUsers ( [{
            id: "1" ,
            photoUrl: "https://cdn.icon-icons.com/icons2/2126/PNG/72/yoda_star_wars_icon_131348.png" ,
            followed: false ,
            fullName: "Dmitry" ,
            status: "I'm a boss" ,
            location: { city: "Minsk" , country: "Belarus" }
        } , {
            id: "2" ,
            photoUrl: 'https://cdn.icon-icons.com/icons2/2126/PNG/72/darth_maul_star_wars_icon_131347.png' ,
            followed: true ,
            fullName: "Sasha" ,
            status: "I'm a boss" ,
            location: { city: "Moscow" , country: "Russia" }
        } ,
            {
                id: "3" ,
                photoUrl: "https://cdn.icon-icons.com/icons2/2126/PNG/72/the_emperor_star_wars_icon_131346.png" ,
                followed: true ,
                fullName: "Andrey" ,
                status: "I'm a boss too" ,
                location: { city: "Kiev" , country: "Ukraine" }
            }] )
    }

    return (
        <div>
            {props.users.map ( (el) =>
                <div key={el.id}>
                    <span>
                        <div>
                            <img src={el.photoUrl} alt="avatar"/>
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
                            <div>{el.fullName}</div>
                            <div>{el.status}</div></span>
                        <span>
                            <div>{el.location.country}</div>
                            <div>{el.location.city}</div>
                        </span>
                    </span>
                </div> )}
        </div>
    );
};

export default Users;