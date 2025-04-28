import { FC } from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeChanger?: boolean;
}

const MyPagination: FC<PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  pageSizeOptions = [5, 10, 20, 50],
  showPageSizeChanger = true,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1, pageSize);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1, pageSize);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber, pageSize);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(1, Number(e.target.value)); // reset to page 1
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Less than 7 pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // More than 7 pages
      pages.push(1);

      if (page > 4) {
        pages.push("...");
      }

      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(totalPages - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (page < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
      {/* Left: Page size changer */}
      {showPageSizeChanger && (
        <div className="flex items-center gap-2 text-primary dark:text-white">
          <span>Items per page:</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-primary rounded p-1 bg-transparent text-primary dark:text-white"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size} className="text-primary">
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Right: Pagination buttons */}
      <div className="flex items-center gap-1 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="border border-primary rounded p-2 px-3 text-primary dark:text-white disabled:opacity-50"
        >
          Prev
        </button>

        {generatePageNumbers().map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={idx}
              onClick={() => handlePageClick(p)}
              className={`border rounded p-2 px-3 ${
                p === page
                  ? "bg-primary text-white"
                  : "border-primary text-primary dark:text-white"
              }`}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className="px-2 text-primary dark:text-white">
              ...
            </span>
          )
        )}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="border border-primary rounded p-2 px-3 text-primary dark:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyPagination;
