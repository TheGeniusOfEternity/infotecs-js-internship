import type {Pagination} from "@/shared/types";
import type {Dispatch, SetStateAction} from "react";
import "./UsersPagination.css";

interface UsersPaginationProps {
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
  total: number;
}

export const UsersPagination = (
  { pagination, setPagination, total }: UsersPaginationProps
) => {
  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Показаны {pagination.page * pagination.limit + 1}–{Math.min((pagination.page + 1) * pagination.limit, total)} из {total} записей
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn prev"
          onClick={() => setPagination(prev => ({ ...prev, page: Math.max(0, prev.page - 1) }))}
          disabled={pagination.page === 0}
        >
          ← Назад
        </button>

        <select
          className="pagination-select"
          value={pagination.limit}
          onChange={(e) => {
            setPagination({ page: 0, limit: +e.target.value });
          }}
        >
          <option value={5}>5 на странице</option>
          <option value={10}>10 на странице</option>
          <option value={20}>20 на странице</option>
          <option value={50}>50 на странице</option>
        </select>

        <button
          className="pagination-btn next"
          onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
          disabled={(pagination.page + 1) * pagination.limit >= total}
        >
          Вперед →
        </button>
      </div>
    </div>
  )
}