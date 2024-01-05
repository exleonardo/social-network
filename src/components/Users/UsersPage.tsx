import {useAppDispatch , useAppSelector} from "../../redux/redux-store";
import {requestUsers ,} from "../../redux/users-reducer";
import React , {useEffect} from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getCurrentPage , getIsFetching , getPageSize , getUsersFilter} from "./users-selectors";


export const UsersPage = () => {

  const isFetching = useAppSelector ( getIsFetching )
  const pageSize = useAppSelector ( getPageSize )
  const currentPage = useAppSelector ( getCurrentPage )
  const filter = useAppSelector ( getUsersFilter )
  const dispatch = useAppDispatch ()
  useEffect ( () => {
    dispatch ( requestUsers ( currentPage , pageSize , filter ) )
  } , [] );

  return (
    <>
      {isFetching ? <Preloader/> : null}
      <Users/>
    </>
  )
}

