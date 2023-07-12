import React from "react";
import s from './Navbar.module.css'



const Navbar = () => {
  const style = `${s.item} ${s.active}`
  return (
    <nav className={s.nav}>
      <div className={style}><a>Profile</a></div>
      <div className={s.item}><a>Message</a></div>
      <div className={s.item}><a>News</a></div>
      <div className={s.item}><a>Music</a></div>
      <div className={s.item}><a>Settings</a></div>
    </nav>
  );
};

export default Navbar;