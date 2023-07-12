import React from "react";
import s from "./Header.module.css"

const Header = () => {
  return (
    <header className={s.header}>
      <img src="https://w7.pngwing.com/pngs/501/177/png-transparent-star-wars-the-old-republic-anakin-skywalker-jedi-vs-sith-jedi-order-symbol-logo-monochrome-anakin-skywalker.png" alt="logo"/>
    </header>
  );
};

export default Header;