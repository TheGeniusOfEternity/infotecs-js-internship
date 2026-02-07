import { useEffect, useState} from 'react'
import {UserResolver} from "@/api/resolvers/user/user.resolver";
import type { ErrorResponseDto } from "@/api/dto/error-response.dto";
import type { UserResponseDto } from "@/api/resolvers/user/dto/user-response.dto";
import type { UsersResponseDto } from "@/api/resolvers/user/dto/users-response.dto";
import sortAsc from '@/assets/sort-asc.svg'
import sortDesc from '@/assets/sort-desc.svg'
import sortNone from '@/assets/sort-none.svg'


type SortField = "fullName" | "age" | "gender" | "phone";
type SortDirection = "asc" | "desc" | null;

export const App = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([])
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const userResolver = new UserResolver();

  const fetchUsers = async () => {
    setLoading(true);
    const response = await userResolver.getAll();
    const status = (response as ErrorResponseDto).status;
    if (!status) {
      setUsers((response as UsersResponseDto).users);
    }
    setLoading(false);
  }

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
              onClick={() => handleSort("fullName")}
              className={sortField === "fullName" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>ФИО</p>
                <img
                  src={getSortIcon('fullName')}
                  alt=""
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th
              onClick={() => handleSort("age")}
              className={sortField === "age" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Возраст</p>
                <img
                  src={getSortIcon('age')}
                  alt=""
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th
              onClick={() => handleSort("gender")}
              className={sortField === "gender" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Пол</p>
                <img
                  src={getSortIcon('gender')}
                  alt=""
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th
              onClick={() => handleSort("phone")}
              className={sortField === "phone" ? "sorted" : ""}
            >
              <div className="column-header">
                <p>Телефон</p>
                <img
                  src={getSortIcon('phone')}
                  alt=""
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </th>
            <th>
              <p>Email</p>
            </th>
            <th>
              <p>Страна</p>
            </th>
            <th>
              <p>Город</p>
            </th>
          </tr>
          </thead>
          <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                {user.lastName} {user.firstName} {user.middleName}
              </td>
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
    </div>
  );
}