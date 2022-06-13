import React from 'react';
import s from './Paginator.module.css'
import ReactPaginate from 'react-paginate';



const Paginator = (props) => {


    const pageCount = Math.ceil(props.totalCount / props.pageSize);

    function handlePageClick({ selected: selectedPage }) {

        props.onPageChanged(selectedPage + 1);
    }

    return (
        <>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                pageClassName={s.pageCount}
                onPageChange={handlePageClick}
                containerClassName={s.pagination}
                previousLinkClassName={s.previousLinkClassName}
                nextLinkClassName={s.nextLinkClassName}
                disabledLinkClassName={"disabled-Link-Class-Name"}
                activeClassName={s.activeClassName}

            >

            </ReactPaginate>

        </>
    );
}
// const Paginator = (props) => {

//     let pagesCount = Math.ceil(props.totalCount / props.pageSize);
//     let pages = [];
//     for (let i = 1; i <= pagesCount; i++) {
//         pages.push(i);
//     }

//     return (

//         <div>
//             <div className={s.wrapper_pagination}>
//                 {pages.map(item => {

//                     return <button className={classname({
//                         [s.pagination]: props.currentPage === item
//                     })}
//                         onClick={(e) => { props.onPageChanged(item) }}>{item}</button>
//                 }
//                 )}
//             </div>
//         </div>


//     );
// }


export default Paginator;


{/* <button disabled={props.followingInProgress.some(id => id === item.id)} onClick={() => {
    //we pick up an id by pushing the button, then some method returns true, because the id is already here
    // so it will be disabled=={true}
    // disabled becomes true only when we pick an id, that allow only the pushed button became disabled

 */}









