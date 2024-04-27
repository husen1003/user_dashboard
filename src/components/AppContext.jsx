import React, { createContext, useEffect, useState } from "react";
import userData from "../data/users.json";

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  // getting persisted data from localstorage
  const persistUsers = JSON.parse(localStorage.getItem("users")) || [];
  const [users, setUsers] = useState(
    persistUsers?.length ? persistUsers : userData
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const userPerPage = 10;

  // Logic for displaying page numbers
  const pageCount = [];
  for (let i = 1; i <= Math.ceil(users.length / userPerPage); i++) {
    pageCount.push(i);
  }

  // updating localstore data for persist usersData into localstorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    // let temp = [...users];
    const temp = users.slice(
      (currentPage - 1) * userPerPage,
      currentPage * userPerPage
    );
    setPageData(temp);

    // checking if curretpage having any data or not, if not we will selecting previous page by default
    if (currentPage > pageCount) setCurrentPage(pageCount.length);
  }, [currentPage, users]);

  const state = {
    users,
    setUsers,
    pageData,
    currentPage,
    setCurrentPage,
    userPerPage,
    pageCount,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
