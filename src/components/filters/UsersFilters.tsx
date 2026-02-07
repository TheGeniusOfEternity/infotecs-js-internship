import "./UsersFilters.css"
import type {Filters, Pagination} from "@/shared/types";
import type {Dispatch, SetStateAction} from "react";

interface UsersFiltersProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  onApply: () => void;
  setPagination: Dispatch<SetStateAction<Pagination>>;
}

export const UsersFilters = (
  {
    filters,
    setFilters,
    onApply,
    setPagination
  }: UsersFiltersProps
) => {
  return (
    <div className="filters-container">
      <div className="filters-group">
        <label htmlFor="lastName-input" className="filter-label">Фамилия</label>
        <input
          id="lastName-input"
          className="filter-input"
          placeholder="Иванов"
          value={filters.lastName || ""}
          onChange={(e) => setFilters(prev => ({ ...prev, lastName: e.target.value }))}
        />
      </div>

      <div className="filters-group">
        <label htmlFor="firstName-input" className="filter-label">Имя</label>
        <input
          id="firstName-input"
          className="filter-input"
          placeholder="Иван"
          value={filters.firstName || ""}
          onChange={(e) => setFilters(prev => ({ ...prev, firstName: e.target.value }))}
        />
      </div>

      <div className="filters-group">
        <label htmlFor="maidenName-input" className="filter-label">Отчество</label>
        <input
          id="maidenName-input"
          className="filter-input"
          placeholder="Иванович"
          value={filters.maidenName || ""}
          onChange={(e) => setFilters(prev => ({ ...prev, maidenName: e.target.value }))}
        />
      </div>

      <div className="filters-group">
        <label htmlFor="age-input" className="filter-label">
          Возраст
        </label>
        <input
          id="age-input"
          className="filter-input"
          type="number"
          placeholder="18"
          style={{ width: "80px" }}
          value={filters.age || ""}
          onChange={(e) => setFilters(prev => ({ ...prev, age: e.target.value }))}
        />
      </div>

      <div className="filters-group">
        <label htmlFor="gender-input" className="filter-label">Пол</label>
        <select
          id="gender-input"
          className="filter-input"
          value={filters.gender || ""}
          onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value || undefined }))}
        >
          <option value="">Все</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>

      <div className="filters-group">
        <label htmlFor="phone-input" className="filter-label">Телефон</label>
        <input
          id="phone-input"
          className="filter-input"
          placeholder="+7..."
          value={filters.phone || ""}
          onChange={(e) => setFilters(prev => ({ ...prev, phone: e.target.value }))}
        />
      </div>

      <div style={{ marginTop: "auto", marginLeft: "auto", display: "flex", gap: "8px" }}>
        <button className="filter-button" onClick={onApply}>
          Применить
        </button>
        <button
          className="clear-filters"
          onClick={() => {
            setFilters({});
            setPagination({ page: 0, limit: 10 });
          }}
        >
          Очистить
        </button>
      </div>
    </div>
  );
};
