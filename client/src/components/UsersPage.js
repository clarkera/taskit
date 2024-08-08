import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the user data from the backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user");
        const data = await response.json();

        if (response.ok) {
          setUsers(data.usersData);
        } else {
          setError(data.message || "Failed to fetch users.");
        }
      } catch (err) {
        setError("There was an error fetching the users.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Signed In Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
