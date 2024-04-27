import cx from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import useAppContext from "../hooks/useContext";
import { useLocation, useNavigate } from "react-router-dom";

const UserForm = () => {
  const { setUsers } = useAppContext();
  const navigate = useNavigate();

  // getting data from table navigation (while clicking on user name)
  const { state } = useLocation();

  // storing current user data into this variable
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // if getting data from table navigation and not editing then we will disable all fields
  const isDisabled = state?.id && !isEditing;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let formError = {};
    const { name, email, role } = formData;

    // validation for required fields
    if (!name) formError.name = "Please enter user name!";
    if (!email) formError.email = "Please enter user email!";
    // validation for email format
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      formError.email = "Please enter valid email address!";
    if (!role) formError.role = "Please select user role!";

    setErrors(formError);
    return Object.keys(formError).length;
  };

  // Create or update user function while submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = validate();
    if (hasError) return;
    setErrors({});

    // if updating user
    if (state) {
      setUsers((prevUsers) => {
        const updatedUser = [...prevUsers];
        const userIndex = updatedUser.indexOf(
          updatedUser.find(({ id }) => id === state.id)
        );
        updatedUser[userIndex] = {
          ...updatedUser[userIndex],
          ...formData,
        };
        return updatedUser;
      });
    } else {
      // else creating new user
      setUsers((prevUsers) => {
        const id = prevUsers[prevUsers.length - 1]?.id + 1;
        return [...prevUsers, { id, ...formData }];
      });
    }
    navigate("/");
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);

    // resetting the data if cancelling
    setFormData(state);
  };

  const getClassName = useCallback(
    (field) => {
      return {
        labelClass: cx("block mb-2 text-sm font-medium text-white", {
          "text-red-500": errors[field],
        }),
        inputClass: cx(
          "shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",
          {
            " !focus:border-red-500 !text-red-500 !placeholder-red-500 !border-red-500":
              errors[field],
          }
        ),
      };
    },
    [errors]
  );

  useEffect(() => {
    if (state) setFormData(state);
  }, [state]);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-800 ">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 sm:max-w-xl mx-auto bg-gray-700 p-8 rounded-3xl shadow-xl"
      >
        {state && (
          <div className="flex justify-end w-full">
            <button
              type="button"
              onClick={handleEdit}
              className="border px-4 py-1 rounded-md"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
        )}
        <h1 className="text-center text-2xl mb-5">
          {state ? "User Details" : "Add User"}
        </h1>
        <div className="mb-5">
          <label htmlFor="name" className={getClassName("name").labelClass}>
            User Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isDisabled}
            className={getClassName("name").inputClass}
            placeholder="Enter your name..."
          />
          <p className="mt-2 text-sm text-red-500">{errors?.name}</p>
        </div>
        <div className="mb-5">
          <label htmlFor="email" className={getClassName("email").labelClass}>
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isDisabled}
            className={getClassName("email").inputClass}
            placeholder="name@example.com"
          />
          <p className="mt-2 text-sm text-red-500">{errors?.email}</p>
        </div>
        <div className="mb-5">
          <label htmlFor="role" className={getClassName("role").labelClass}>
            Select Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className={getClassName("role").inputClass}
            disabled={isDisabled}
            placeholder="name@example.com"
          >
            <option value="">Select role</option>
            {["User", "Admin"].map((role) => (
              <option key={role} value={role} className="text-white">
                {role}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-red-500">{errors?.role}</p>
        </div>
        {!isDisabled && (
          <button
            type="submit"
            className="bg-gray-400 text-gray-900 font-medium px-5 py-2 rounded-lg w-full mt-5"
          >
            {state ? "Update" : "Add"} User
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
