// import React from 'react';
// import ReactPaginate from 'react-paginate';
// //import  s from './Paginator.module.css';
// //const { s } = require('./Paginator.module.css');





// const Paginator = ({ onPageChanged, pageSize, totalCount }) => {

//     const pageCount = Math.ceil(totalCount / pageSize);
//     function handlePageClick({ selected: selectedPage }) {
//         onPageChanged(selectedPage + 1);
//     }

//     return (
//         <>
//             <ReactPaginate
//                 previousLabel={"Previous"}
//                 nextLabel={"Next"}
//                 pageCount={pageCount}
//                 pageClassName={s.pageCount}
//                 onPageChange={handlePageClick}
//                 containerClassName={s.pagination}
//                 previousLinkClassName={s.previousLinkClassName}
//                 nextLinkClassName={s.nextLinkClassName}
//                 disabledLinkClassName={"disabled-Link-Class-Name"}
//                 activeClassName={s.activeClassName}
//             >

//             </ReactPaginate>

//         </>
//     );
// }


// export default Paginator;



// // const Paginator = (props) => {

// //     let pagesCount = Math.ceil(props.totalCount / props.pageSize);
// //     let pages = [];
// //     for (let i = 1; i <= pagesCount; i++) {
// //         pages.push(i);
// //     }

// //     return (

// //         <div>
// //             <div className={s.wrapper_pagination}>
// //                 {pages.map(item => {

// //                     return <button className={classname({
// //                         [s.pagination]: props.currentPage === item
// //                     })}
// //                         onClick={(e) => { props.onPageChanged(item) }}>{item}</button>
// //                 }
// //                 )}
// //             </div>
// //         </div>


// //     );
// // }















