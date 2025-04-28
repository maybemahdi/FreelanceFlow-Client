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

  if (totalPages <= 1) return null; // Hide pagination if only 1 page

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
      {/* Left Side: Page Size Changer */}
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

      {/* Right Side: Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="border border-primary rounded p-2 px-3 text-primary dark:text-white disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`border rounded p-2 px-3 ${
                pageNumber === page
                  ? "bg-primary text-white"
                  : "border-primary text-primary dark:text-white"
              }`}
            >
              {pageNumber}
            </button>
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
