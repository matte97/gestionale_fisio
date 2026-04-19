import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  total: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  total,
  from,
  to,
  onPageChange,
}) => {
  if (lastPage <= 1) return null;

  const pages = [];
  const delta = 2;
  const left = currentPage - delta;
  const right = currentPage + delta + 1;

  for (let i = 1; i <= lastPage; i++) {
    if (i === 1 || i === lastPage || (i >= left && i < right)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white border-t border-gray-100 gap-4">
      <div className="text-sm text-gray-500">
        Mostrando da <span className="font-semibold text-gray-800">{from}</span> a{" "}
        <span className="font-semibold text-gray-800">{to}</span> di{" "}
        <span className="font-semibold text-gray-800">{total}</span> risultati
      </div>

      <nav className="flex items-center -space-x-px" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-2 py-2 rounded-l-xl border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <span className="sr-only">Precedente</span>
          <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center">
          {pages.map((page, idx) =>
            typeof page === "number" ? (
              <button
                key={idx}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-semibold transition-all shadow-sm mx-0.5 rounded-lg ${
                  currentPage === page
                    ? "z-10 bg-indigo-600 text-white border-indigo-600 shadow-indigo-100"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ) : (
              <span
                key={idx}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400"
              >
                {page}
              </span>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="relative inline-flex items-center px-2 py-2 rounded-r-xl border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <span className="sr-only">Successivo</span>
          <HiChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};
