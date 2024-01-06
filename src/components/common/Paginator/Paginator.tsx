import React , {useState} from 'react';
import s from './Paginator.module.css'
import {FormValues , requestUsers} from "../../../redux/users-reducer";
import {useAppDispatch , useAppSelector} from "../../../redux/redux-store";
import {getCurrentPage , getPageSize , getTotalUsersCount , getUsersFilter} from "../../Users/users-selectors";

type PaginatorType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  filter: FormValues
}
const Paginator = ({ filter , pageSize , currentPage , totalUsersCount }: PaginatorType) => {

  const dispatch = useAppDispatch ()

  const onPageChanged = (page: number , filter: FormValues) => {
    dispatch ( requestUsers ( page , pageSize , filter ) )
  }
  let pagesCount = Math.ceil ( totalUsersCount / pageSize );
  let pages: Array<number> = [];
  const [page , setPage] = useState ( 0 )
  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push ( i );
  }
  let slicedPages;
  if ( page - 5 <= 0 ) {
    slicedPages = pages.slice ( page , page + 5 );
  } else {
    slicedPages = pages.slice ( page , page + 5 );
  }

  const nextPage = () => {
    setPage ( (state) => state + 5 );
  }
  const backPage = () => {
    setPage ( (state) => state - 5 );
  }

  return (
    <div>
      {page > 1 && <button onClick={backPage}>back</button>}
      {slicedPages.map ( (el , index) => {
        return <span key={index}
                     className={currentPage === el ? s.selectedPage : ''}
                     onClick={() => onPageChanged ( el , filter )}
        > {el} </span>
      } )}
      <button onClick={nextPage}>next</button>
    </div>
  );
};

export default Paginator;