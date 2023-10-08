import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean;
    login: string | null
    logOut: () => void
}
const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img
                src="https://w7.pngwing.com/pngs/501/177/png-transparent-star-wars-the-old-republic-anakin-skywalker-jedi-vs-sith-jedi-order-symbol-logo-monochrome-anakin-skywalker.png"
                alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login}
                        <button onClick={props.logOut}>Log out</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;