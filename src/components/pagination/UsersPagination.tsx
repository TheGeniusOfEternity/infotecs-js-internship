import type {Pagination} from "@/shared/types";
import "./UsersPagination.css";

interface UsersPaginationProps {
  pagination: Pagination;
  onPaginationChange: (newPagination: Pagination) => void;
  total: number;
}

export const UsersPagination = (
  {
    pagination,
    onPaginationChange,
    total
  }: UsersPaginationProps) => {
  const handlePrev = () => {
    if (pagination.page > 0) {
      const newPagination = { ...pagination, page: pagination.page - 1 };
      onPaginationChange(newPagination);
    }
  };

  const handleNext = () => {
    if ((pagination.page + 1) * pagination.limit < total) {
      const newPagination = { ...pagination, page: pagination.page + 1 };
      onPaginationChange(newPagination);
    }
  };

  const handleLimitChange = (limit: number) => {
    onPaginationChange({ page: 0, limit });
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        {total === 0
          ? "Показаны 0–0 из 0 записей"
          : `Показаны ${pagination.page * pagination.limit + 1}–${Math.min((pagination.page + 1) * pagination.limit, total)} из ${total} записей`}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn prev"
          onClick={handlePrev}
          disabled={pagination.page === 0}
        >
          ← Назад
        </button>

        <select
          className="pagination-select"
          value={pagination.limit}
          onChange={(e) => handleLimitChange(+e.target.value)}
        >
          <option value={5}>5 на странице</option>
          <option value={10}>10 на странице</option>
          <option value={20}>20 на странице</option>
          <option value={50}>50 на странице</option>
        </select>

        <button
          className="pagination-btn next"
          onClick={handleNext}
          disabled={(pagination.page + 1) * pagination.limit >= total}
        >
          Вперед →
        </button>
      </div>
    </div>
  );
};
