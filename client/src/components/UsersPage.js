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

      <div id="myDIV" class="header">
        <h2>My To-Do List</h2>

        <input type="text" id="myInput" placeholder="Title..." />
        <button onclick="newElement()" class="addBtn">
          Add
        </button>
      </div>
      <ul id="myUL">
        <li class="task">Work on HTML - Jessica</li>
        <li class="task checked">CSS - Beth</li>
        <li class="task">JavaScript - Rachael</li>
        <li class="task">We need snacks!</li>
        <li class="task">Read MDN Web Docs</li>
        <li class="task">Organize office</li>
      </ul>
    </div>
  );
};
export default UsersPage;
