import React, { useMemo } from "react";
import useAppContext from "../hooks/useContext";
import cx from "classnames";

const Pagination = () => {
  const { users, currentPage, setCurrentPage, pageCount } = useAppContext();
  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage === pageCount.length) return;
    setCurrentPage(currentPage + 1);
  };
  const pageNumbers = useMemo(
    () =>
      pageCount.map((number) => {
        return (
          <li key={number} id={number}>
            <span
              onClick={() => setCurrentPage(number)}
              className={cx(
                "flex items-center justify-center px-3 h-8 ms-0 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer",
                {
                  "!border-gray-700 !bg-gray-700 !text-white hover:!bg-gray-400":
                    number === currentPage,
                }
              )}
            >
              {number}
            </span>
          </li>
        );
      }),
    [users, currentPage]
  );

  return (
    <nav className="flex justify-center w-full mt-5">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <span
            onClick={handlePrevPage}
            className={cx(
              "flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer",
              {
                "opacity-80 !cursor-not-allowed": currentPage === 1,
              }
            )}
          >
            Previous
          </span>
        </li>
        {pageNumbers}
        <li>
          <span
            onClick={handleNextPage}
            className={cx(
              "flex items-center justify-center px-3 h-8 leading-tight border  rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer",
              {
                "opacity-80 !cursor-not-allowed":
                  currentPage === pageCount.length,
              }
            )}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
