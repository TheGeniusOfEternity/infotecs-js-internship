import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {UserResolver} from "@/api/resolvers/user.resolver";
import type { ErrorResponseDto } from "@/api/dto/error-response.dto";
import type { UserResponseDto } from "@/api/dto/user-response.dto";
import type { UsersResponseDto } from "@/api/dto/users-response.dto";

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState<UserResponseDto[]>([])

  const userResolver = new UserResolver();

  const fetchUsers = async () => {
    const response = await userResolver.getAll();
    const status = (response as ErrorResponseDto).status;
    if (!status) {
      setUsers((response as UsersResponseDto).users);
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
