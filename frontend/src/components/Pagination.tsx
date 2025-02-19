import React from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageButtons = 5;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const halfRange = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(currentPage - halfRange, 1);
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="join justify-center my-2.5">
      <button
        className="join-item rounded-none btn btn-sm"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`join-item rounded-none btn btn-sm ${
            currentPage === pageNumber ? "btn-active" : ""
          }`}
          onClick={() => paginate(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="join-item rounded-none btn btn-sm"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
