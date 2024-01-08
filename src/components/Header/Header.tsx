import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useAppDispatch , useAppSelector} from "../../redux/redux-store";
import {getIsAuth , getLogin} from "../Login/login-selectors";
import {logOut} from "../../redux/auth-reducer";
import {Button} from "antd";
import {MenuFoldOutlined , MenuUnfoldOutlined} from "@ant-design/icons";

type Header = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}
export const Header = ({ collapsed , setCollapsed }: Header) => {
  const dispatch = useAppDispatch ()
  const isAuth = useAppSelector ( getIsAuth )
  const login = useAppSelector ( getLogin )

  const loggedOut = () => {
    dispatch ( logOut () )
  }
  return (
    <header className={s.header}>
      <Button
        className={s.headerButton}
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined rev={undefined}/> : <MenuFoldOutlined rev={undefined}/>}
        onClick={() => setCollapsed ( !collapsed )}
        style={{
          fontSize: '16px' ,
          width: 64 ,
          height: 64 ,
        }}
      />
      <div className={s.loginBlock}>
        {isAuth
          ? <div>
            {login}
            <Button onClick={loggedOut}>Log out</Button>
          </div>
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  );
};

