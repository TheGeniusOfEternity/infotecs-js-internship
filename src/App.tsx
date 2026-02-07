import {useCallback, useEffect, useRef, useState} from 'react'
import {UserResolver} from "@/api/resolvers/user/user.resolver";
import type { ErrorResponseDto } from "@/api/dto/error-response.dto";
import type { UserResponseDto } from "@/api/resolvers/user/dto/user-response.dto";
import type { UsersResponseDto } from "@/api/resolvers/user/dto/users-response.dto";
import sortAsc from '@/assets/sort-asc.svg'
import sortDesc from '@/assets/sort-desc.svg'
import sortNone from '@/assets/sort-none.svg'
import type {Filters, Pagination, SortDirection, SortField} from "@/shared/types";
import {UsersFilters} from "@/components/filters/UsersFilters";
import {UsersPagination} from "@/components/pagination/UsersPagination";

export const App = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([])
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({});
  const [pagination, setPagination] = useState<Pagination>({ page: 0, limit: 10 });
  const [total, setTotal] = useState(0);

  const userResolver = useRef(new UserResolver());

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await userResolver.current.getAllWithFilters(
        filters,
        sortField,
        sortDirection,
        pagination
      );

      const status = (response as ErrorResponseDto).status;
      if (!status) {
        const usersData = response as UsersResponseDto;
        setUsers(usersData.users ?? []);
        setTotal(usersData.total);
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortField, sortDirection, pagination]); // ✅ Все зависимости

  // ✅ Загрузка при изменении любого параметра
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePaginationChange = useCallback((newPagination: Pagination) => {
    setPagination(newPagination);
  }, []);

  const handleSort = useCallback((field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection("asc");
    } else {
      setSortDirection(prev => {
        if (prev === "asc") return "desc";
        if (prev === "desc") return null;
        return "asc";
      });
    }
    setPagination(prev => ({ ...prev, page: 0 }));
  }, [sortField]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field || !sortDirection) return sortNone;
    if (sortDirection === 'asc') return sortAsc;
    return sortDesc;
  };


  return (
    <div className="container">
      <h3>Список пользователей</h3>
      <UsersFilters
        filters={filters}
        setFilters={setFilters}
        onApply={fetchUsers}
        setPagination={setPagination}
      />
      <div className={loading ? "wrapper loading" : "wrapper"}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
          <thead>
          <tr>
            <th
              scope="col"
              aria-sort={
                sortField === "lastName"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              onClick={() => handleSort("lastName")}
              className={sortField === "lastName" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Фамилия</p>
                <img
                  src={getSortIcon('lastName')}
                  alt=""
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th
              scope="col"
              aria-sort={
                sortField === "firstName"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              onClick={() => handleSort("firstName")}
              className={sortField === "firstName" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Имя</p>
                <img
                  src={getSortIcon('firstName')}
                  alt="sort-icon"
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th
              scope="col"
              aria-sort={
                sortField === "maidenName"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              onClick={() => handleSort("maidenName")}
              className={sortField === "maidenName" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Отчество</p>
                <img
                  src={getSortIcon('maidenName')}
                  alt="sort-icon"
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th
              scope="col"
              aria-sort={
                sortField === "age"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              onClick={() => handleSort("age")}
              className={sortField === "age" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Возраст</p>
                <img
                  src={getSortIcon('age')}
                  alt="sort-icon"
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th
              scope="col"
              aria-sort={
                sortField === "gender"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              onClick={() => handleSort("gender")}
              className={sortField === "gender" && sortDirection !== null ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Пол</p>
                <img
                  src={getSortIcon('gender')}
                  alt="sort-icon"
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th
              scope="col"
              aria-sort={
                sortField === "phone"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              onClick={() => handleSort("phone")}
              className={sortField === "phone" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Телефон</p>
                <img
                  src={getSortIcon('phone')}
                  alt="sort-icon"
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th scope="col">
              <p>Email</p>
            </th>
            <th scope="col">
              <p>Страна</p>
            </th>
            <th scope="col">
              <p>Город</p>
            </th>
          </tr>
          </thead>
          <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.maidenName ? user.maidenName : '---------'}</td>
              <td>{user.age}</td>
              <td>{user.gender === "male" ? "Мужской" : "Женский"}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.country}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <UsersPagination
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        total={total}
      />
    </div>
  );
}