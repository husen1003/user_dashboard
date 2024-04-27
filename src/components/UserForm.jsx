import cx from "classnames";
import React, { useCallback, useMemo, useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = validate();
    if (hasError) return;
    setErrors({});
    console.log({ formData });
  };
  const getClassName = useCallback(
    (field) => {
      return {
        labelClass: cx("block mb-2 text-sm font-medium text-white", {
          "text-red-500": errors[field],
        }),
        inputClass: cx(
          "shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500",
          {
            " !focus:border-red-500 !text-red-500 !placeholder-red-500 !border-red-500":
              errors[field],
          }
        ),
      };
    },
    [errors]
  );
  return (
    <div className="flex h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 sm:max-w-sm mx-auto bg-gray-700 p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-center text-2xl mb-5">User form</h1>
        <div className="mb-5">
          <label htmlFor="name" className={getClassName("name").labelClass}>
            User Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className={getClassName("name").inputClass}
            placeholder="Enter your name..."
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.name}
          </p>
        </div>
        <div className="mb-5">
          <label htmlFor="email" className={getClassName("email").labelClass}>
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            className={getClassName("email").inputClass}
            placeholder="name@example.com"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.email}
          </p>
        </div>
        <div className="mb-5">
          <label htmlFor="role" className={getClassName("role").labelClass}>
            Select Role
          </label>
          <select
            name="role"
            id="role"
            onChange={handleChange}
            className={getClassName("role").inputClass}
            placeholder="name@example.com"
          >
            <option value="">Select role</option>
            {["User", "Admin"].map((role) => (
              <option key={role} value={role} className="text-white">
                {role}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.role}
          </p>
        </div>
        <button
          type="submit"
          className="bg-gray-400 text-gray-700 px-5 py-1 rounded-lg w-full mt-5"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
