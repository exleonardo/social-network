import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/yoda_star_wars_icon_131348.png";
import {UsersInfoType} from "../../redux/users-reducer";

type UsersTypeProps = {
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (page: number) => void;
    users: UsersInfoType[];
    follow: (userId: number) => void;
    unfollow: (userId: number) => void

}
const Users = (props: UsersTypeProps) => {
    let pagesCount = Math.ceil ( props.totalUsersCount / props.pageSize );
    let pages = [];
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push ( i );
    }

    let slicedPages;
    let curPage = props.currentPage;
    if ( curPage - 3 < 0 ) {
        slicedPages = pages.slice ( 0 , 5 );
    } else {
        slicedPages = pages.slice ( curPage - 3 , curPage + 2 );
    }
    return (
        <div>
            <div>
                {slicedPages.map ( (el , index) => {
                    return <span key={index}
                                 className={props.currentPage === el ? s.selectedPage : ''}
                                 onClick={() => props.onPageChanged ( el )}

                    >{el}
                            </span>
                } )}
            </div>
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