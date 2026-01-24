import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  lastPage,
  nextPageUrl,
  prevPageUrl,
  onPageChange,
}) => {
  if (!lastPage || lastPage <= 1) return null;

  return (
    <div className="w-full flex flex-row justify-center items-center gap-2">
      <button
        disabled={!prevPageUrl}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="bg-blue-500 w-6 h-6 rounded-lg flex items-center justify-center"
      >
        <FaArrowLeft className="text-white" />
      </button>

      {[...Array(lastPage)].map((_, i) => {
        const pageNumber = i + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`bg-blue-500 w-6 h-6 rounded-lg flex items-center justify-center text-white ${
              pageNumber === currentPage ? "font-bold" : ""
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={!nextPageUrl}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-blue-500  w-6 h-6 rounded-lg flex items-center justify-center"
      >
        <FaArrowRight className="text-white" />
      </button>
    </div>
  );
};

export default Pagination;
