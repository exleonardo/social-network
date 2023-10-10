import React from 'react';
import s from './Paginator.module.css'

type PaginatorType = {
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (page: number) => void;
}
const Paginator: React.FC<PaginatorType> = ({ totalUsersCount , pageSize , currentPage , onPageChanged }) => {
    let pagesCount = Math.ceil ( totalUsersCount / pageSize );
    let pages = [];
    for (let i = 1; i <= pagesCount; i += 1) {
        pages.push ( i );
    }
    let slicedPages;
    let curPage = currentPage;
    if ( curPage - 3 < 0 ) {
        slicedPages = pages.slice ( 0 , 5 );
    } else {
        slicedPages = pages.slice ( curPage - 3 , curPage + 2 );
    }
    return (
        <div>
            {slicedPages.map ( (el , index) => {
                return <span key={index}
                             className={currentPage === el ? s.selectedPage : ''}
                             onClick={() => onPageChanged ( el )}
                >{el}
                            </span>
            } )}
        </div>
    );
};

export default Paginator;