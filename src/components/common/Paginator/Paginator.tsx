import React , {useState} from 'react';
import s from './Paginator.module.css'

type PaginatorType = {
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (page: number) => void;
}
const Paginator: React.FC<PaginatorType> = ({ totalUsersCount , pageSize , currentPage , onPageChanged }) => {
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
                return <><span key={index}
                               className={currentPage === el ? s.selectedPage : ''}
                               onClick={() => onPageChanged ( el )}
                >{el}

                            </span> </>
            } )}
            <button onClick={nextPage}>next</button>
        </div>
    );
};

export default Paginator;