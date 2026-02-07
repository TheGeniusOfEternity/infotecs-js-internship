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
    const params = new URLSearchParams();

    params.append('limit', pagination.limit.toString());
    params.append('skip', (pagination.page * pagination.limit).toString());

    if (sortField && sortDirection) {
      params.append('sortBy', sortField);
      params.append('order', sortDirection);
    }

    if (filters.firstName) params.append('firstName', filters.firstName);
    if (filters.lastName) params.append('lastName', filters.lastName);
    if (filters.maidenName) params.append('maidenName', filters.maidenName);
    if (filters.age) params.append('age', filters.age);
    if (filters.gender) params.append('gender', filters.gender);
    if (filters.phone) params.append('phone', filters.phone);

    const response = await userResolver.current.getAll(null, null);
    const status = (response as ErrorResponseDto).status;
    if (!status) {
      const usersData = response as UsersResponseDto;
      setUsers(usersData.users ?? []);
      setTotal(usersData.total);
    }
    setLoading(false);
  }, [sortField, sortDirection, pagination, filters]);


  useEffect(() => {
    fetchUsers()
  }, [sortField, sortDirection])

  const handleSort = (field: SortField) => {
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
  };

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
                sortField === "firstName"
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
                sortField === "firstName"
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
                sortField === "firstName"
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
                sortField === "firstName"
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
                sortField === "firstName"
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
        setPagination={setPagination}
        total={total}
      />
    </div>
  );
}