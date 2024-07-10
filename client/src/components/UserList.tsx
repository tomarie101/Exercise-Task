// import React from 'react'
import Users from "../pages/Users";

function UserList() {
  return (
    <div>
      <Users />
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>onClick</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
