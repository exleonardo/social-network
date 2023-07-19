import React from "react";
import s from "./Dialogs.module.css"
import { NavLink } from "react-router-dom";

const Dialogs = () => {
  return (
    <div className={ s.dialogs }>
      <div className={ s.dialogsItems }>
        <div className={s.dialog}><NavLink activeClassName={s.active}  to="/dialogs/1">Dimych</NavLink></div>
        <div className={s.dialog}><NavLink activeClassName={s.active} to="/dialogs/2">Andrey</NavLink></div>
        <div className={s.dialog}><NavLink activeClassName={s.active} to="/dialogs/3">Svaeta</NavLink></div>
        <div className={s.dialog}><NavLink activeClassName={s.active} to="/dialogs/4">Victor</NavLink></div>
        <div className={s.dialog}><NavLink activeClassName={s.active} to="/dialogs/5">Valera</NavLink></div>
      </div>
      <div className={s.messages} >
        <div className={ s.message }>HI</div>
        <div className={ s.message }>How is you it-camasutra</div>
        <div className={ s.message }>yo</div>
      </div>
    </div>
  );
};

export default Dialogs;