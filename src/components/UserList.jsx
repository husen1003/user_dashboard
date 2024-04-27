import React from "react";
import { Link } from "react-router-dom";
import useAppContext from "../hooks/useContext";

const UserList = ({ data = [] }) => {
  const { users } = useAppContext();
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
          {users.map(({ id, name, email, role }) => (
            <tr
              key={id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{id}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {name}
              </th>
              <td className="px-6 py-4">{email}</td>
              <td className="px-6 py-4">{role}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  to="/user-details"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
