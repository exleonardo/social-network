import {useAppSelector} from "../../redux/redux-store";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "./users-selectors";
import {getIsAuth} from "../Login/login-selectors";
import {Redirect} from "react-router-dom";


export const UsersPage = () => {

  const isFetching = useAppSelector ( getIsFetching )
  const initialized = useAppSelector ( getIsAuth )
  if ( !initialized ) {
    return <Redirect to={'/unautorized'}/>
  }
  return (
    <>
      {isFetching ? <Preloader/> : null}
      <Users/>
    </>
  )
}

