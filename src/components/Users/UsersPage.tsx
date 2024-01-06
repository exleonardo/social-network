import {useAppSelector} from "../../redux/redux-store";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "./users-selectors";


export const UsersPage = () => {

  const isFetching = useAppSelector ( getIsFetching )

  return (
    <>
      {isFetching ? <Preloader/> : null}
      <Users/>
    </>
  )
}

