import React from "react";
import s from "./Dialogs.module.css"

const Dialogs = () => {
  return (
    <div className={ s.dialogs }>
      <div className={ s.dialogsItems }>
        <div className={s.dialog + " " + s.active} >Dimych</div>
        <div className={s.dialog}>Andrey</div>
        <div className={s.dialog}>Svaeta</div>
        <div className={s.dialog}>Victor</div>
        <div className={s.dialog}>Valera</div>
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