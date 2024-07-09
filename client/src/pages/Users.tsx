import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserById = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${id}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="App">
      {users.map((user) => (
        <div key={user.id} className="userId">
          <div className="name">{user.name}</div>
          <div className="email">{user.email}</div>
          <button onClick={() => fetchUserById(user.id)}>View Details</button>
        </div>
      ))}
      {selectedUser && (
        <div className="selectedUser">
          <h2>Selected User</h2>
          <div className="name">Name: {selectedUser.name}</div>
          <div className="email">Email: {selectedUser.email}</div>
        </div>
      )}
    </div>
  );
}

export default Users;
