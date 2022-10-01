import React, { useState } from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";

//const cn = require('classnames')
//const styles = require('./Paginator.module.css');

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage?: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.pagination}>
      {portionNumber > 1 && (
        <button
          className={styles.previousLinkClassName}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className={cn(
                {
                  [styles.activeClassName]: currentPage === p,
                },
                styles.pageCount
              )}
              key={p}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </a>
          );
        })}

      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
          className={styles.nextLinkClassName}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
