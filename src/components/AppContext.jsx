import React, { createContext, useEffect, useState } from "react";
import userData from "../data/users.json";

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  // getting persisted data from localstorage
  const persistUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(persistUsers || userData);

  // updating localstore data for persist usersData into localstorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <AppContext.Provider value={{ users, setUsers }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
