import React from "react";
import s from './Navbar.module.css'
import { NavLink } from "react-router-dom";



const Navbar = () => {
  const style = `${s.item} ${s.active}`
  return (
    <nav className={s.nav}>
      <div className={style}><NavLink activeClassName={s.active} to="/profile">Profile</NavLink ></div>
      <div className={s.item}><NavLink activeClassName={s.active} to="/dialogs">Message</NavLink></div>
      <div className={s.item}><NavLink activeClassName={s.active} to="/news">News</NavLink></div>
      <div className={s.item}><NavLink activeClassName={s.active} to="/music">Music</NavLink></div>
      <div className={s.item}><NavLink activeClassName={s.active} to="/setting">Settings</NavLink></div>
    </nav>
  );
};

export default Navbar;