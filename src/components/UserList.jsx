import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useContext";

const UserList = ({ data = [] }) => {
  const navigate = useNavigate();

  // getting data from context
  const { users, setUsers } = useAppContext();

  // function for removing users
  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to remove ${user.name}?`))
      setUsers((prevUsers) => prevUsers.filter(({ id }) => id !== user.id));
  };

  // navigating with userData
  const handleNavigate = (userData) => {
    navigate("/user-details", { state: userData });
  };

  console.log(users);
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right">
          <div className="flex justify-between items-center">
            <div>User Dashboard</div>
            <div>
              <Link
                to="/user-details"
                className="bg-gray-400 text-gray-700 px-5 py-1 rounded-lg"
              >
                Add User
              </Link>
            </div>
          </div>
        </caption>
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              User name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((userData = {}) => {
            const { id, name, email, role } = userData;
            return (
              <tr key={id} className="border-b bg-gray-800 border-gray-700">
                <td className="px-6 py-4">{id}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white underline cursor-pointer"
                  onClick={() => handleNavigate(userData)}
                >
                  {name}
                </th>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">{role}</td>
                <td className="px-6 py-4 text-right">
                  <span
                    onClick={() => handleDelete(userData)}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
