import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useContext";
import Pagination from "./Pagination";

const UserList = ({ data = [] }) => {
  const navigate = useNavigate();

  // getting data from context
  const { users, setUsers, pageData } = useAppContext();

  // function for removing users
  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to remove ${user.name}?`))
      setUsers((prevUsers) => prevUsers.filter(({ id }) => id !== user.id));
  };

  // navigating with userData
  const handleNavigate = (userData) => {
    navigate("/user-details", { state: userData });
  };

  // getting adminCount to show on the dashboard
  const adminCount = users.reduce(
    (count, { role }) => (role === "Admin" ? count + 1 : count),
    0
  );

  const userCount = users.length - adminCount;

  return (
    <div className="p-1 bg-gray-800">
      <div className="max-w-screen-xl grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 w-full text-white my-2  p-2  ">
        <div className=" bg-[#212a36] shadow-2xl shadow-gray-900  rounded-lg  p-3  ">
          <div className=" relative flex items-center justify-between">
            <p className="text-[15px] sm:text-[18px] font-medium">Total :</p>
          </div>
          <div className=" text-[28px] sm:text-[40px] font-semibold">
            {users.length}
          </div>
        </div>
        <div className=" bg-[#212a36] shadow-2xl  rounded-lg  p-3  ">
          <div className=" relative flex items-center justify-between">
            <p className="text-[15px] sm:text-[18px] font-medium">Admin :</p>
          </div>
          <div className=" text-[28px] sm:text-[40px] font-semibold">
            {adminCount}
          </div>
        </div>
        <div className=" bg-[#212a36] shadow-2xl  rounded-lg  p-3  ">
          <div className=" relative flex items-center justify-between">
            <p className="text-[15px] sm:text-[18px] font-medium">User :</p>
          </div>
          <div className=" text-[28px] sm:text-[40px] font-semibold">
            {userCount}
          </div>
        </div>
      </div>
      <div className="mx-1 sm:mx-9 my-2 ">
        <div className="flex justify-between items-center">
          <div className=" text-[18px] sm:text-[24px] text-white font-medium">
            User Dashboard
          </div>
          <div>
            <Link
              to="/user-details"
              className="border-[1px] text-white px-5 sm:px-10 py-2 rounded-md"
            >
              Add User
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto my-2 w-[98%]">
        <table className="w-full ">
          <thead className=" bg-gray-700 text-[#fff]">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">User name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">
                <span className="">View / Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto overflow-x-auto">
            {users?.length ? (
              pageData.map((userData = {}) => {
                const { id, name, email, role } = userData;
                return (
                  <tr
                    key={id}
                    className="text-[14px] text-[#fff] font-light border-b-[1px] text-center capitalize"
                  >
                    <td className="w-1/12 px-1 py-3">{id}</td>
                    <td
                      scope="row"
                      className="w-2/12 font-medium whitespace-nowrap text-white underline cursor-pointer"
                      onClick={() => handleNavigate(userData)}
                    >
                      {name}
                    </td>
                    <td className="w-2/12 px-1 py-3">{email}</td>
                    <td className="w-1/12 px-1 py-3">{role}</td>

                    <td className="w-2/12">
                      <span
                        onClick={() => handleNavigate(userData)}
                        className="text-white hover:underline mr-5 border border-white px-3 py-1 rounded-md cursor-pointer"
                      >
                        View
                      </span>
                      <span
                        onClick={() => handleDelete(userData)}
                        className="text-red-500 cursor-pointer hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <th colSpan={5} className="h-[60vh]">
                No data
              </th>
            )}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default UserList;
